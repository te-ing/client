import { useCallback, useEffect, useState } from 'react';
import { useQuery, QueryClient, dehydrate, useMutation, useQueryClient } from 'react-query';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { userTabMenuArr } from 'constants/tabMenu';
import usersApi from 'apis/users.api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CameraIcon, CameraIconWrapper, ProfileIcon, ProfileWrapper } from 'components/common/Atomic/Profile';
import { camera_icon, default_profile } from 'constants/imgUrl';
import { numberWithCommas } from 'utils/numberWithCommas';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import Following from 'components/User/Following';
import Message from 'components/User/Message';
import styled from 'styled-components';
import { GetStaticPropsContext } from 'next';
import { useUploadImage } from 'hooks/useUploadImage';
import useForm from 'hooks/useForm';
import { UserEditForm } from 'types/user';
import { userEditForm } from 'utils/userEditForm';
import AddImage from 'components/Profile/AddImage';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';
import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';
import PostList from 'components/User/PostList';
import { email } from 'constants/regExp';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const [userState] = useRecoilState(userInfoState);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('postCount');
  const [values, setValues, handler] = useForm<UserEditForm | null>(null);
  const [bannerImg, setBannerImg, bannerImgUpload] = useUploadImage();
  const [profileImg, setProfileImg, profileImgUpload] = useUploadImage();

  const { isLoading, isError, error, data } = useQuery(
    ['user-profile', id],
    () => usersApi.checkUsers(id, { isRequiredLogin: sessionStorage.getItem('jwtToken') ? true : false }),
    {
      onSuccess: (data) => {
        if (!editMode) {
          setValues(userEditForm(data));
          setBannerImg(data.backgroundImage);
          setProfileImg(data.profileImage);
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
  useEffect(() => {
    return () => {
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

  if (isError) {
    return <h1>{error}</h1>;
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
        </>
      ) : (
        <>
          <Banner bannerImg={data?.backgroundImage} isTeamPage={false} />
        </>
      )}
      <InfoWrapper>
        <ProfileImg>
          <ProfileWrapper>
            {editMode ? (
              <>
                <ProfileLabel htmlFor="profile-input">
                  <ProfileWrapper>
                    <ProfileIcon
                      alt="icon-profile"
                      src={profileImg.length > 0 ? profileImg : default_profile}
                      width={116}
                      height={116}
                    />
                    <CameraIconWrapper direction="left">
                      <CameraIcon alt="icon-camera" src={camera_icon} width={24} height={24} />
                    </CameraIconWrapper>
                  </ProfileWrapper>
                </ProfileLabel>
                <FileInput id="profile-input" type="file" name="profileImage" onChange={profileImgUpload} />
              </>
            ) : (
              <ProfileWrapper>
                <ImgWrapper
                  alt="icon-profile"
                  src={!data?.profileImage ? default_profile : data?.profileImage}
                  width={116}
                  height={116}
                />
              </ProfileWrapper>
            )}
          </ProfileWrapper>
        </ProfileImg>
        <InfoSection>
          {editMode ? (
            <>
              <EditNickname
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                onChange={handler}
                value={values.nickname}
              />
              <InitButton onClick={initProfile}>프로필 초기화</InitButton>
            </>
          ) : (
            <h1>{data?.nickname}</h1>
          )}

          <InfoDescription>
            <div>
              {data?.categories.map((ability) => (
                <Keyword key={ability.id}>{ability.name}</Keyword>
              ))}
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
              {!editMode && <UploadProduct />}
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
      {/* {currentTab === 'scrapCount' && <ItemList itemList={Items[currentTab]} />} */}
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

const ProfileImg = styled.div``;

const ImgWrapper = styled(Image)`
  border-radius: 50%;
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

const EditNickname = styled.input`
  width: 240px;
  height: 26px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
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
