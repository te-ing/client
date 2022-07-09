import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, QueryClient, dehydrate, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';

import { ProfileWrapper } from 'components/common/Atomic/Profile';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { camera_icon, team_nickname_icon, team_profile_icon } from 'constants/imgUrl';
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

import QuitTeam from 'components/Team/Profile/QuitTeam';
import { teamEditForm } from 'utils/teamEditForm';
import TeamPostList from 'components/Team/Profile/TeamPostList';
import MemberList from 'components/Team/Profile/MemberList';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { useUploadImage } from 'hooks/useUploadImage';
import AddImage from 'components/Profile/AddImage';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';
import { editPostState } from 'recoil/editRecoil';
import TeamProfileImage from 'components/Team/Profile/TeamProfileImg';
import TeamNickname from 'components/Team/Profile/TeamNickname';

//props로 id 넘겨주기

const TeamProfile = ({ dehydratedState }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

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
      onSuccess: () => {
        queryClient.invalidateQueries(['team-profile', id]);
      },
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('postCount');
  const [values, setValues, handler] = useForm<TeamEditForm>({
    title: profileData.title,
    description: profileData.description,
    team_profile_image: profileData.teamProfileImage,
    background_image: profileData.backgroundImage,
  });
  const [userState] = useRecoilState(userInfoState);
  const [editPost, setEditPost] = useRecoilState(editPostState);
  const [bannerImg, setBannerImg, bannerImgUpload] = useUploadImage();
  const [profileImg, setProfileImg, profileImgUpload] = useUploadImage();

  const postEditHandler = (id: number) => (e: MouseEvent) => {
    e.stopPropagation();
    setEditPost({ ...editPost, id });
  };

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

  const initProfile = () => {
    setProfileImg('');
    setBannerImg('');
    setValues({ title: '', description: '', team_profile_image: '', background_image: '' });
  };
  useEffect(() => {
    window.addEventListener('click', postEditHandler(-1));
    return () => {
      window.removeEventListener('click', postEditHandler(-1));
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
      <AddImage
        originImg={profileData?.backgroundImage}
        bannerImg={bannerImg}
        bannerImgUpload={bannerImgUpload}
        editMode={editMode}
        isTeamPage={false}
      />
      <InfoWrapper>
        <div>
          <TeamProfileImage
            editMode={editMode}
            originImg={profileData.teamProfileImage}
            profileImg={profileImg}
            profileImgUpload={profileImgUpload}
          />
        </div>
        <InfoSection>
          <TeamNickname
            editMode={editMode}
            originNickname={profileData.title}
            changedNickname={values.title}
            handler={handler}
            initProfile={initProfile}
          />
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
              {!editMode && <UploadProduct isTeam={true} />}
            </>
          ) : membersData.find((member) => member.userId === userState.id) ? (
            <QuitTeam memberId={membersData.find((member) => member.userId === userState.id).memberId} teamId={id} />
          ) : (
            <>
              <ApplyTeam teamId={id} />
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

const InfoWrapper = styled.div`
  padding: 24px;
  position: relative;
  margin-bottom: 80px;
  display: flex;
`;

const InfoSection = styled.div`
  margin-left: 24px;
  width: 610px;

  & > h1 {
    font-size: 20px;
    line-height: 1.3;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.profileNameBlack};
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    & span {
      margin-left: 5px !important;
    }
  }
`;

const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  p {
    color: ${({ theme }) => theme.color.gray_700};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;♻️
  }
`;

const DescriptionArea = styled.textarea`
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

const InfoAside = styled.div`
  position: absolute;
  right: 24px;
`;

const EditNickname = styled.input`
  width: 240px;
  height: 26px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  margin-bottom: 16px;
  &::placeholder {
    font-family: 'Noto Sans KR', sans serif;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
    color: ${({ theme }) => theme.color.gray_400};
  }
`;

const InitButton = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  color: ${({ theme }) => theme.color.gray_500};
  margin-left: 16px;
`;
