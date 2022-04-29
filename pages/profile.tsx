import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import UserInfo from 'components/Profile/UserInfo';
import ItemList from 'components/Profile/ItemList';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { tabMenuArr } from 'constants/tabMenu';
import usersApi from './api/users.api';
import { User, UserEditForm } from 'types/user';
import { userEditForm } from 'utils/userEditForm';
const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery(['user-profile'], () => usersApi.checkUsers(4), {
    onSuccess: ({ data }) => {
      setTestForm(userEditForm(data));
    },
  }); // useQuery로 유저정보 받아옴.

  const { mutate: userInfoMutate } = useMutation(() => usersApi.editUser(4, testForm, { isRequiredLogin: true }), {
    onSuccess: (data) => {
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
      // console.log(e.target);
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
    //컴포넌트 구조 변경 필요
    <Layout>
      <Banner editMode={editMode} bannerImg={data?.data.backgroundImage} />
      <UserInfo
        editMode={editMode}
        info={data?.data}
        editModeOnOff={editModeOnOff}
        testFormHook={testFormHook}
        userInfoMutate={userInfoMutate}
      ></UserInfo>
      <div style={{ marginBottom: '40px' }}>
        {tabMenuArr.map((tab, i) => (
          <TabButton active={tab.isActive} key={i} onClick={selectTab(tab.id)}>
            {tab.name}
            <span>{Items[tab.id].length}</span>
          </TabButton>
        ))}
      </div>
      <ItemList itemList={Items[currentTab]} />
    </Layout>
  );
};

export default Profile;
