import usersApi from 'apis/users.api';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PostType } from 'types/post';
import { User } from 'types/user';
import { isLoggedIn } from 'utils/isLoggedIn';
import PostHeaderButtons from './PostHeaderButtons.tsx';
import PostHeaderInfo from './PostHeaderInfo';
import SkeletonHeader from './SkeletonHeader SkeletonHeader';

const UserPostHeader = ({ post }: { post: PostType }) => {
  const getUserInfo = async () => {
    const data = await usersApi.getUserInfo(post.author, { isRequiredLogin: isLoggedIn() });
    return data;
  };
  const { data, isLoading } = useQuery<User>('user', getUserInfo);

  return !isLoading ? (
    <PostHeader>
      <PostHeaderInfo post={post} user={data} />
      <PostHeaderButtons postId={post.id} user={data} />
    </PostHeader>
  ) : (
    <SkeletonHeader />
  );
};

export default UserPostHeader;

export const PostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding: 23px;
`;
