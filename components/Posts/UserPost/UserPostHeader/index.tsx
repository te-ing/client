import usersApi from 'apis/users.api';
import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PostType } from 'types/post';
import { User } from 'types/user';
import PostHeaderButtons from './PostHeaderButtons.tsx';
import PostHeaderInfo from './PostHeaderInfo';

const UserPostHeader = ({ post }: { post: PostType }) => {
  const getUserInfo = async () => {
    const data = await usersApi.getUserInfo(post.author);
    return data;
  };
  const { data, isLoading } = useQuery<User>('user', getUserInfo);

  return !isLoading ? (
    <Header>
      <PostHeaderInfo post={post} user={data} />
      <PostHeaderButtons post={post} profileImage={data.profileImage} />
    </Header>
  ) : (
    <LoadingHeader />
  );
};

export default UserPostHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding: 23px;
  background-color: lightgrey;
`;

const LoadingHeader = styled(Header)`
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
