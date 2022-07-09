import { useCallback, useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useQuery, QueryClient, dehydrate, useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import Layout from 'components/Layout';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { Keyword, TempKeyword } from 'components/common/Atomic/Tabs/Keyword';
import Following from 'components/User/Following';
import Message from 'components/User/Message';
import AddImage from 'components/Profile/AddImage';
import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';
import PostList from 'components/User/PostList';
import ScrapList from 'components/User/ScrapList';
import InterestModal from 'components/User/InterestModal';
import usersApi from 'apis/users.api';
import { userEditForm } from 'utils/userEditForm';
import { numberWithCommas } from 'utils/numberWithCommas';
import { userInfoState } from 'recoil/auth';
import { editPostState } from 'recoil/editRecoil';
import useForm from 'hooks/useForm';
import { useUploadImage } from 'hooks/useUploadImage';
import { UserEditForm } from 'types/user';
import { add_interest_icon, sub_interest_icon } from 'constants/imgUrl';
import { userTabMenuArr } from 'constants/tabMenu';
import ProfileImage from 'components/User/ProfileImage';
import Nickname from 'components/User/NickName';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const { isError, error, data } = useQuery(
    ['user-profile', id],
    () => usersApi.checkUsers(id, { isRequiredLogin: sessionStorage.getItem('jwtToken') ? true : false }),
    {
      onSuccess: (data) => {
        if (!editMode) {
          setValues(userEditForm(data));
          setBannerImg(data.backgroundImage);
          setProfileImg(data.profileImage);
          setInterestList(data.categories);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    }
  ); // useQuery로 유저정보 받아옴.

  const { mutate: userInfoMutate } = useMutation(
    () => usersApi.editUser(sessionStorage.getItem('id'), values, { isRequiredLogin: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user-profile', id]);
      },
    }
  );

  const [userState] = useRecoilState(userInfoState);
  const [interestOnOff, setInterestOnOff] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('postCount');
  const [values, setValues, handler] = useForm<UserEditForm>({
    email: data.email,
    nickname: data.nickname,
    description: data.description,
    profileImage: data.profileImage,
    backgroundImage: data.backgroundImage,
    categories: data.categories.join(','),
  });
  const [bannerImg, setBannerImg, bannerImgUpload] = useUploadImage(data.backgroundImage);
  const [profileImg, setProfileImg, profileImgUpload] = useUploadImage(data.profileImage);
  const [editPost, setEditPost] = useRecoilState(editPostState);
  const [interestList, setInterestList] = useState<{ id: number; name: string }[]>([...data.categories]);

  const postEditHandler = (id: number) => (e: MouseEvent) => {
    e.stopPropagation();
    setEditPost({ ...editPost, id });
  };

  const editModeOnOff = useCallback(
    (flag: boolean) => () => {
      setEditMode(flag);
      if (!flag) {
        userInfoMutate();
      }
    },
    [editMode]
  );

  const selectTab = useCallback(
    (id: string) => () => {
      userTabMenuArr.forEach((tab) => {
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
    setValues({ nickname: '', description: '', profileImage: '', backgroundImage: '' });
  };

  const interestHandler = (flag: boolean) => () => {
    setInterestOnOff(flag);
  };

  const deleteInterest = (id: number) => () => {
    setInterestList(interestList.filter((interest) => interest.id !== id));
  };

  useEffect(() => {
    window.addEventListener('click', postEditHandler(-1));
    return () => {
      window.removeEventListener('click', postEditHandler(-1));
      userTabMenuArr.forEach((tab) => {
        if (tab.id === 'scrapCount') tab.isActive = false;
        else tab.isActive = true;
      });
    };
  }, []);

  useEffect(() => {
    setValues({ ...values, profileImage: profileImg });
  }, [profileImg]);

  useEffect(() => {
    setValues({ ...values, backgroundImage: bannerImg });
  }, [bannerImg]);

  useEffect(() => {
    const list = interestList.map((el) => el.id).join(',');
    setValues({ ...values, categories: list });
  }, [interestList]);

  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <Layout>
      {interestOnOff && (
        <InterestModal
          setInterestOnOff={setInterestOnOff}
          interestList={interestList}
          setInterestList={setInterestList}
        />
      )}
      <AddImage
        originImg={data?.backgroundImage}
        bannerImg={bannerImg}
        bannerImgUpload={bannerImgUpload}
        editMode={editMode}
        isTeamPage={false}
      />
      <InfoWrapper>
        <ProfileImage
          editMode={editMode}
          originImg={data?.profileImage}
          profileImg={profileImg}
          profileImgUpload={profileImgUpload}
        />
        <InfoSection>
          <Nickname
            editMode={editMode}
            originNickname={data?.nickname}
            changedNickname={values.nickname}
            handler={handler}
            initProfile={initProfile}
          />
          <InfoDescription>
            <div>
              {editMode ? (
                <>
                  {interestList.map((ability) => (
                    <TempKeyword key={ability.id}>
                      {ability.name}
                      <button onClick={deleteInterest(ability.id)}>
                        <Image src={sub_interest_icon} width={16} height={16} />
                      </button>
                    </TempKeyword>
                  ))}
                  <TempKeyword style={{ cursor: 'pointer' }} onClick={interestHandler(true)}>
                    <Image src={add_interest_icon} width={16} height={16} />
                  </TempKeyword>
                </>
              ) : (
                data?.categories.map((ability) => <Keyword key={ability.id}>{ability.name}</Keyword>)
              )}
            </div>
            <FollowInfo>
              <span>팔로워</span>
              <span>{numberWithCommas(Number(data?.followerCount))}</span>
              <span>팔로잉</span>
              <span>{numberWithCommas(Number(data?.followingCount))}</span>
            </FollowInfo>
            {editMode ? (
              <DescriptionArea
                name="description"
                onChange={handler}
                placeholder="사용자 소개를 입력해주세요."
                value={values.description}
              />
            ) : (
              <p>{data?.description}</p>
            )}
          </InfoDescription>
        </InfoSection>
        <InfoAside>
          {data.id === userState.id ? (
            <>
              <ProfileEdit editMode={editMode} editModeOnOff={editModeOnOff} />
              {!editMode && <UploadProduct isTeam={false} />}
            </>
          ) : (
            <>
              <Following userId={id} isFollowing={data.isFollowed} />
              <Message />
            </>
          )}
        </InfoAside>
      </InfoWrapper>
      <div style={{ marginBottom: '40px' }}>
        {userTabMenuArr.map((tab, i) => (
          <TabButton active={tab.isActive} key={i} onClick={selectTab(tab.id)}>
            {tab.name}
            <span>{data[tab.id]}</span>
          </TabButton>
        ))}
      </div>
      {currentTab === 'postCount' && (
        <PostList userId={id} isLeader={userState.id === Number(id)} editMode={editMode} />
      )}
      {currentTab === 'scrapCount' && <ScrapList userId={id} isLeader={false} editMode={editMode} />}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const queryClient = new QueryClient();
    const id = context.params?.id as string;

    await queryClient.prefetchQuery(['user-profile', id], ({ queryKey }) => usersApi.getUserInfo(Number(queryKey[1])));

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

export default UserProfile;

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
  }
`;
const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & > div {
    display: flex;
  }
  p {
    color: ${({ theme }) => theme.color.gray_700};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 12px;
    line-height: 1.416666;
  }
`;

const FollowInfo = styled.div`
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
