import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient, QueryClient, dehydrate } from 'react-query';
import Image from 'next/image';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import AddImage from 'components/Profile/AddImage';
import ItemList from 'components/Profile/ItemList';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { ProfileIcon, ProfileWrapper } from 'components/common/Atomic/Profile';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { camera_icon, team_profile_icon } from 'constants/imgUrl';
import { teamTabMenuArr } from 'constants/tabMenu';

import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';
import { useRouter } from 'next/router';
import teamsApi from 'apis/teams.api';
import { GetStaticPropsContext } from 'next';
import useForm from 'hooks/useForm';
import { teamEditForm } from 'utils/teamEditForm';
import { TeamEditForm } from 'types/team';
import MemberCard from 'components/Team/MemberCard';

const TeamProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, error, data } = useQuery(['team-profile', '1'], () => teamsApi.checkTeamProfile('1'), {
    onSuccess: (data) => {
      setValues(teamEditForm(data));
    },
    onError: (error) => {
      console.log(error);
    },
  }); // useQuery로 유저정보 받아옴.
  const queryClient = useQueryClient();

  const { mutate: teamInfoMutate } = useMutation(
    () => teamsApi.editTeamProfile('1', values, { isRequiredLogin: true }),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(['team-profile', '1'], data);
      },
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState('post');
  const [values, setValues, handler] = useForm<TeamEditForm>();

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

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }

  return (
    // <Layout>
    <>
      <Banner bannerImg={data?.backgroundImage}>
        {(!data?.backgroundImage || editMode) && (
          <AddImage editMode={editMode} text={!editMode ? '팀 프로젝트 배너를 추가 해주세요.' : '배너 변경하기'} />
        )}
      </Banner>
      <InfoWrapper>
        <div>
          {editMode ? (
            <ImageUploadWrapper name="editProfile">
              <ProfileWrapper>
                <ImgWrapper
                  alt="icon-profile"
                  src={data?.teamProfileImage ? data?.teamProfileImage : team_profile_icon}
                  width={120}
                  height={120}
                />
                <CameraIconWrapper>
                  <Image alt="icon-camera" src={camera_icon} width={24} height={24} />
                </CameraIconWrapper>
              </ProfileWrapper>
            </ImageUploadWrapper>
          ) : (
            <ProfileWrapper>
              <ImgWrapper
                alt="icon-profile"
                src={data?.teamProfileImage ? data?.teamProfileImage : team_profile_icon}
                width={120}
                height={120}
              />
            </ProfileWrapper>
          )}
        </div>
        <InfoSection>
          <h1>{data?.title}</h1>
          <InfoDescription>
            {editMode ? (
              <DescriptionArea name="description" onChange={handler} placeholder="사용자 소개를 입력해주세요." />
            ) : (
              <p>{data?.description}</p>
            )}
          </InfoDescription>
        </InfoSection>
        <InfoAside>
          <ProfileEdit editMode={editMode} editModeOnOff={editModeOnOff} />
          {!editMode && <UploadProduct />}
        </InfoAside>
      </InfoWrapper>
      <div style={{ marginBottom: '40px' }}>
        {teamTabMenuArr.map((tab, i) => (
          <TabButton active={tab.isActive} key={i} onClick={selectTab(tab.id)}>
            {tab.name}
            {/* <span>{Items[tab.id].length}</span> */}
          </TabButton>
        ))}
      </div>
      <ItemListWrapper>
        <MemberCard memberId={1} />
        <MemberCard memberId={1} />
        <MemberCard memberId={1} />
      </ItemListWrapper>
      {/* {currentTab === 'post' && <ItemList editMode={editMode} itemList={Items[currentTab]} />}
      {currentTab === 'scrap' && <ItemList itemList={Items[currentTab]} />} */}
      {/* </Layout> */}
    </>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const queryClient = new QueryClient();
    const id = context.params?.id as string;

    await queryClient.prefetchQuery(['team-profile', '1'], ({ queryKey }) => teamsApi.checkTeamProfile(queryKey[1]));

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

export const ItemListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(363px, 1fr));

  row-gap: 25px;
  column-gap: 24px;
`;

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
