import { FlexBox } from 'styles/commonStyles';
import styled from 'styled-components';
import { DefaultButton } from 'components/common/Atomic/Tabs/Button';
import MainCard from 'components/common/MainCard';
import Image from 'next/image';
import Layout from 'components/Layout';
import postsApi from 'apis/posts.api';
import { PostType } from 'types/post';
import { useQuery } from 'react-query';

const PostCards = () => {
  const getPosts = async () => {
    const data = await postsApi.getMainPosts();
    return data;
  };
  const { data, isLoading } = useQuery<PostType[]>('post', getPosts);

  return (
    <Layout>
      <MainHeader>
        <SearchBox>
          <SearchInput placeholder="검색어를 입력해주세요." />
          <SearchIcon>
            <Image src={'/images/search.svg'} width="24" height="24" />
          </SearchIcon>
        </SearchBox>
        <FlexBox>
          <FilterBtn>전체보기</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
        </FlexBox>
      </MainHeader>
      <MainContent>
        {isLoading
          ? 'Loading..'
          : data?.map((post) => {
              return <MainCard post={post} key={post.id} />;
            })}
      </MainContent>
    </Layout>
  );
};

const MainHeader = styled(FlexBox)`
  justify-content: space-between;
  margin: 24px 0 36px;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;

  padding: 8px 16px 8px 49px;

  border-radius: 30px;
  border: 1px solid #8e8e8e;
  outline: none;

  font-size: 12px;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 8px;
  cursor: pointer;
`;

const FilterBtn = styled(DefaultButton)`
  width: 80px;
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const MainContent = styled(FlexBox)`
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default PostCards;
