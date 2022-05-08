import React, { useCallback, useState } from 'react';
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
import { tabMenuArr } from 'constants/tabMenu';
import usersApi from 'apis/users.api';
import { UserEditForm } from 'types/user';
import { userEditForm } from 'utils/userEditForm';
import { numberWithCommas } from 'utils/numberWithCommas';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import ProfileEdit from 'components/Profile/ProfileEdit';
import UploadProduct from 'components/Profile/UploadProduct';

const Profile = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery(['user-profile'], () => usersApi.checkUsers(4), {
    onSuccess: (data) => {
      setTestForm(userEditForm(data));
    },
  }); // useQuery로 유저정보 받아옴.

  const { mutate: userInfoMutate } = useMutation(() => usersApi.editUser(4, testForm, { isRequiredLogin: true }), {
    onSuccess: (data) => {
      console.log('data', data);
      queryClient.setQueryData('user-profile', data);
    },
  });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState('post');
  const [testForm, setTestForm] = useState<UserEditForm>();
  //Suspense를 사용하게 된다면, useQuery를 여러개 선언하는것은 사용할 수 없으므로, useQueries를 사용해야함
  const Items = {
    post: ['작업물1'], //['아이템1', '아이템2'],
    scrap: [
      '',
      '스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.',
      '스크랩2',
      '스크랩3',
      '스크랩4',
      '스크랩5',
      '스크랩6',
      '스크랩7',
      '스크랩8',
      '스크랩9',
    ],
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
      tabMenuArr.forEach((tab) => {
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

  const testFormHook = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log('name = %s value = %s', name, value);
      console.log('banner : ', testForm.backgroundImage);
      console.log('profile : ', testForm.profileImage);
      console.log('description : ', testForm.description);
      setTestForm({ ...testForm, [name]: value });
    },
    [testForm, setTestForm]
  );
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <>
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
              <DescriptionArea name="description" onChange={testFormHook} placeholder="사용자 소개를 입력해주세요." />
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
        {tabMenuArr.map((tab, i) => (
          <TabButton active={tab.isActive} key={i} onClick={selectTab(tab.id)}>
            {tab.name}
            <span>{Items[tab.id].length}</span>
          </TabButton>
        ))}
      </div>
      {currentTab === 'post' && <ItemList editMode={editMode} itemList={Items[currentTab]} />}
      {currentTab === 'scrap' && <ItemList itemList={Items[currentTab]} />}
    </>
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
