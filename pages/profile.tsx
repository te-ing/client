import React, { useCallback, useState } from 'react';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import UserInfo from 'components/Profile/UserInfo';
import ItemList from 'components/Profile/ItemList';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
const Profile: React.FC = () => {
  const [user, getUserQuery] = useState('serre'); // useQuery로 유저정보 받아옴.

  //Suspense를 사용하게 된다면, useQuery를 여러개 선언하는것은 사용할 수 없으므로, useQueries를 사용해야함
  const Items = {
    items: [], //['아이템1', '아이템2'],
    scrabs: [
      '',
      '스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.스크랩1 제목입니다.',
      '스크랩2',
      '스크랩3',
      '스크랩4',
      '스크랩5',
      '스크랩6',
      '스크랩7',
      '스크랩8',
    ],
  };
  const [currentTab, setCurrentTab] = useState(0);
  const tabMenuArr = [
    ['작업물', 'items'],
    ['스크랩', 'scrabs'],
  ];
  const selectTab = useCallback(
    (index: number) => () => {
      setCurrentTab(index);
    },
    [currentTab, setCurrentTab]
  );
  return (
    <Layout>
      <Banner />
      <UserInfo />
      <div style={{ marginBottom: '40px' }}>
        {tabMenuArr.map((tab, i) => (
          <TabButton active={currentTab === i} key={i} onClick={selectTab(i)}>
            {tab[0]}
            <span>{Items[tabMenuArr[i][1]].length}</span>
          </TabButton>
        ))}
      </div>
      <ItemList itemList={Items[tabMenuArr[currentTab][1]]} />
    </Layout>
  );
};

export default Profile;
