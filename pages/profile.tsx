import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import styled from 'styled-components';
import Banner from 'components/Profile/Banner';
import AddImage from 'components/Profile/AddImage';
import ItemList from 'components/Profile/ItemList';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { ProfileIcon, ProfileWrapper, CameraIcon, CameraIconWrapper } from 'components/common/Atomic/Profile';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { camera_icon, default_profile } from 'constants/imgUrl';
import { userTabMenuArr } from 'constants/tabMenu';
import usersApi from 'apis/users.api';
import { UserEditForm } from 'types/user';
import { userEditForm } from 'utils/userEditForm';
import { numberWithCommas } from 'utils/numberWithCommas';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';
import { UploadButton } from 'components/common/Atomic/Tabs/Button';
import useForm from 'hooks/useForm';
import Router from 'next/router';
import { userInfo } from 'recoil/auth';
import { useRecoilState } from 'recoil';
import Layout from 'components/Layout';

const Profile = () => {
  const queryClient = useQueryClient();
  const [, setUserInfo] = useRecoilState(userInfo);

  const { isLoading, isError, error, data } = useQuery(
    ['user-profile'],
    () => usersApi.checkUsers(sessionStorage.getItem('id')),
    {
      onSuccess: (data) => {
        setValues(userEditForm(data));
        setUserInfo(data);
      },
      onError: () => {
        Router.push('/');
      },
    }
  );

  const { mutate: userInfoMutate } = useMutation(
    () => usersApi.editUser(sessionStorage.getItem('id'), values, { isRequiredLogin: true }),
    {
      onSuccess: ({ data }) => {
        console.log(data);
        queryClient.setQueryData('user-profile', data);
      },
    }
  );

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('postCount');
  const [values, setValues, handler] = useForm<UserEditForm | null>(null);
  //Suspense를 사용하게 된다면, useQuery를 여러개 선언하는것은 사용할 수 없으므로, useQueries를 사용해야함

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

  useEffect(() => {
    if (!sessionStorage.getItem('jwtToken')) {
      Router.push('/');
    }
  }, []);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <Layout>
      <Banner bannerImg={data?.backgroundImage}>
        {(!data?.backgroundImage || editMode) && (
          <AddImage editMode={editMode} text={!editMode ? '프로필 배너를 추가해주세요.' : '배너 변경하기'} />
        )}
      </Banner>
      <InfoWrapper>
        <ProfileImg>
          {editMode ? (
            <ImageUploadWrapper name="editProfile">
              <ProfileWrapper>
                <ProfileIcon
                  alt="icon-profile"
                  src={!data?.profileImage ? default_profile : data?.profileImage}
                  width={116}
                  height={116}
                />
                <CameraIconWrapper direction="left">
                  <CameraIcon alt="icon-camera" src={camera_icon} width={24} height={24} />
                </CameraIconWrapper>
              </ProfileWrapper>
            </ImageUploadWrapper>
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
        </ProfileImg>
        <InfoSection>
          <h1>{data?.nickname}</h1>
          <InfoDescription>
            <div>
              {data?.categories.map((ability) => (
                <Keyword key={ability.id}>{ability.name}</Keyword>
              ))}
            </div>
            <FollowInfo>
              <span>팔로워</span>
              <span>{numberWithCommas(data?.followerCount)}</span>
              <span>팔로잉</span>
              <span>{numberWithCommas(data?.followingCount)}</span>
            </FollowInfo>
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
          <UploadButton />
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
      {/* {currentTab === 'postCount' && <ItemList editMode={editMode} itemList={Items[currentTab]} />}
      {currentTab === 'scrapCount' && <ItemList itemList={Items[currentTab]} />} */}
    </Layout>
  );
};

export default Profile;

export const InfoWrapper = styled.div`
  padding: 24px;
  position: relative;
  margin-bottom: 80px;
  display: flex;
`;

export const ProfileImg = styled.div``;

export const ImgWrapper = styled(Image)`
  border-radius: 50%;
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
