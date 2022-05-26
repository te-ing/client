import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, QueryClient, dehydrate, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';

import ItemList from 'components/Profile/ItemList';

import { ProfileWrapper } from 'components/common/Atomic/Profile';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { camera_icon, team_profile_icon } from 'constants/imgUrl';
import { teamTabMenuArr } from 'constants/tabMenu';

import { useRouter } from 'next/router';
import teamsApi from 'apis/teams.api';
import { GetStaticPropsContext } from 'next';

import Message from 'components/Team/Profile/MessageButton';
import ApplyTeam from 'components/Team/Profile/ApplyTeam';
import useForm from 'hooks/useForm';
import { TeamEditForm } from 'types/team';
import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import QuitTeam from 'components/Team/Manangement/QuitTeam';
import { teamEditForm } from 'utils/teamEditForm';
import TeamPostList from 'components/Team/Profile/TeamPostList';
import MemberList from 'components/Team/Profile/MemberList';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { useUploadImage } from 'hooks/useUploadImage';
import AddImage from 'components/Profile/AddImage';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';

//props로 id 넘겨주기

const TeamProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('postCount');
  const [values, setValues, handler] = useForm<TeamEditForm>();
  const [userState] = useRecoilState(userInfoState);

  const [bannerImg, setBannerImg, bannerImgUpload] = useUploadImage();
  const [profileImg, setProfileImg, profileImgUpload] = useUploadImage();

  const {
    isLoading: profileIsLoading,
    isError: profileIsError,
    error: profileError,
    data: profileData,
  } = useQuery(['team-profile', id], () => teamsApi.checkTeamProfile(id), {
    onSuccess: (data) => {
      if (!editMode) {
        setValues(teamEditForm(data));
        setBannerImg(data.backgroundImage);
        setProfileImg(data.teamProfileImage);
      }
    },
  });
  const {
    isLoading: memberisLoading,
    isError: memberisError,
    error: memberError,
    data: membersData,
  } = useQuery(['team-members', id], () => teamsApi.getTeamMembers(id), {
    onSuccess: (data) => {
      console.log('memeber', data);
    },
  });

  const { mutate: teamInfoMutate } = useMutation(
    () => teamsApi.editTeamProfile(id, values, { isRequiredLogin: true }),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(['team-profile', id], data);
      },
    }
  );
  // const [values, setValues, handler] = useForm<TeamEditForm>();

  //Suspense를 사용하게 된다면, useQuery를 여러개 선언하는것은 사용할 수 없으므로, useQueries를 사용해야함

  const editModeOnOff = useCallback(
    (flag: boolean) => () => {
      setEditMode(flag);

      if (!flag) {
        teamInfoMutate();
      }
    },
    [editMode]
  );

  const selectTab = useCallback(
    (id: string) => () => {
      teamTabMenuArr.forEach((tab) => {
        if (tab.id === id) {
          tab.isActive = true;
          setCurrentTab(tab.id);
        } else {
          tab.isActive = false;
        }
      });
    },
    [currentTab]
  );

  useEffect(() => {
    return () => {
      teamTabMenuArr.forEach((tab) => {
        if (tab.id === 'memberCount') tab.isActive = false;
        else tab.isActive = true;
      });
    };
  }, []);

  useEffect(() => {
    setValues({ ...values, team_profile_image: profileImg });
  }, [profileImg]);

  useEffect(() => {
    setValues({ ...values, background_image: bannerImg });
  }, [bannerImg]);

  if (profileIsLoading || memberisLoading) {
    return (
      <Layout>
        <h1>Loading</h1>
      </Layout>
    );
  }

  if (profileError || memberError) {
    return <h1>{profileError || memberError}</h1>;
  }

  return (
    <Layout>
      {editMode ? (
        <>
          <AddImage
            bannerImg={bannerImg}
            bannerImgUpload={bannerImgUpload}
            editMode={editMode}
            text={!editMode ? '프로필 배너를 추가해주세요.' : '배너 변경하기'}
          />
          <button onClick={() => setBannerImg('')}>초기화</button>
        </>
      ) : (
        <Banner bannerImg={profileData?.backgroundImage} />
      )}

      <InfoWrapper>
        <div>
          {editMode ? (
            <>
              <ProfileLabel htmlFor="file-input">
                <ProfileWrapper>
                  <ImgWrapper
                    alt="icon-profile"
                    src={profileImg.length ? profileImg : team_profile_icon}
                    width={120}
                    height={120}
                  />
                  <CameraIconWrapper>
                    <Image alt="icon-camera" src={camera_icon} width={24} height={24} />
                  </CameraIconWrapper>
                </ProfileWrapper>
                <FileInput id="file-input" type="file" name="team_profile_image" onChange={profileImgUpload} />
              </ProfileLabel>
            </>
          ) : (
            <ProfileWrapper>
              <ImgWrapper
                alt="icon-profile"
                src={profileData?.teamProfileImage ? profileData?.teamProfileImage : team_profile_icon}
                width={120}
                height={120}
              />
            </ProfileWrapper>
          )}
        </div>
        <InfoSection>
          <h1>{profileData?.title}</h1>
          <InfoDescription>
            {editMode ? (
              <DescriptionArea name="description" onChange={handler} placeholder="사용자 소개를 입력해주세요." />
            ) : (
              <p>{profileData?.description}</p>
            )}
          </InfoDescription>
        </InfoSection>
        <InfoAside>
          {profileData.leader === userState.id ? (
            <>
              <ProfileEdit editMode={editMode} editModeOnOff={editModeOnOff} />
              {!editMode && <UploadProduct />}
            </>
          ) : membersData.map((member) => member.user).includes(userState.id) ? (
            <QuitTeam />
          ) : (
            <>
              <ApplyTeam />
              <Message />
            </>
          )}
        </InfoAside>
      </InfoWrapper>
      <div style={{ marginBottom: '40px' }}>
        {teamTabMenuArr.map((tab, i) => (
          <TabButton active={tab.isActive} key={i} onClick={selectTab(tab.id)}>
            {tab.name}
            <span>{profileData[tab.id]}</span>
          </TabButton>
        ))}
      </div>
      {currentTab === 'postCount' && (
        <TeamPostList teamId={id} isLeader={profileData.leader === userState.id ? true : false} editMode={editMode} />
      )}
      {currentTab === 'memberCount' && <MemberList memberList={membersData} />}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const queryClient = new QueryClient();
    const id = context.params?.id as string;

    await queryClient.prefetchQuery(['team-profile', id], ({ queryKey }) => teamsApi.checkTeamProfile(queryKey[1]));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default TeamProfile;

export const InfoWrapper = styled.div`
  padding: 24px;
  position: relative;
  margin-bottom: 80px;
  display: flex;
`;

export const ImgWrapper = styled(Image)`
  border-radius: 12px;
`;

export const InfoSection = styled.div`
  margin-left: 24px;
  width: 610px;

  & > h1 {
    font-size: 20px;
    line-height: 1.3;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.profileNameBlack};
    margin-bottom: 16px;
  }
`;

export const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  p {
    color: ${({ theme }) => theme.color.gray_700};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
  }
`;

export const FollowInfo = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.833333;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.gray_700};
    margin-right: 16px;
  }

  span:nth-child(2n-1) {
    margin-right: 4px;
  }
`;

export const DescriptionArea = styled.textarea`
  box-sizing: border-box;
  resize: none;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  &::placeholder {
    font-family: 'Noto Sans KR', sans serif;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
    color: ${({ theme }) => theme.color.gray_400};
  }

  &::-webkit-scrollbar {
    display: block;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #2f3542;
  }
  &::-webkit-scrollbar-track {
  }
`;

export const InfoAside = styled.div`
  position: absolute;
  right: 24px;
`;

export const CameraIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  left: -18px;
  bottom: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray_700};
`;
