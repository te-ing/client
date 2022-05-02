import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import Layout from 'components/Layout';
import Banner from 'components/Profile/Banner';
import ItemList from 'components/Profile/ItemList';
import { TabButton } from 'components/common/Atomic/Tabs/TabButton';
import { tabMenuArr } from 'constants/tabMenu';
import usersApi from '../api/users.api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ProfileWrapper } from 'components/common/Atomic/Profile';
import { default_profile } from 'constants/imgUrl';
import { numberWithCommas } from 'utils/numberWithCommas';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import Following from 'components/User/Following';
import Message from 'components/User/Message';
import styled from 'styled-components';
import { GetStaticPropsContext } from 'next';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, isError, error, data } = useQuery(['user-profile', id], () => usersApi.checkUsers(id), {
    onError: (error) => {
      console.log(error);
    },
  }); // useQuery로 유저정보 받아옴.

  const [currentTab, setCurrentTab] = useState('post');

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

  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <Layout>
      <Banner bannerImg={data?.backgroundImage} />
      <InfoWrapper>
        <ProfileImg>
          <ProfileWrapper>
            <ImgWrapper
              alt="icon-profile"
              src={!data?.profileImage ? default_profile : data?.profileImage}
              width={116}
              height={116}
            />
          </ProfileWrapper>
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
              <span>{numberWithCommas(Number(data?.followerCount))}</span>
              <span>팔로잉</span>
              <span>{numberWithCommas(Number(data?.followingCount))}</span>
            </FollowInfo>

            <p>{data?.description}</p>
          </InfoDescription>
        </InfoSection>
        <InfoAside>
          <Following />
          <Message />
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
      {currentTab === 'post' && <ItemList itemList={Items[currentTab]} />}
      {currentTab === 'scrap' && <ItemList itemList={Items[currentTab]} />}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const queryClient = new QueryClient();
    const id = context.params?.id as string;

    await queryClient.prefetchQuery(['user-profile', id], ({ queryKey }) => usersApi.checkUsers(queryKey[1]));

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

  & > h1{
    font-size: 20px;
    line-height: 1.3;
    font-weight : ${({ theme }) => theme.fontWeight.bold}
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
