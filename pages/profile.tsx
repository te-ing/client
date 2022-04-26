import React from 'react';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import UserInfo from 'components/Profile/UserInfo';
import ItemList from 'components/Profile/ItemList';
const Profile: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <UserInfo />
      <ItemList />
    </Layout>
  );
};

export default Profile;
