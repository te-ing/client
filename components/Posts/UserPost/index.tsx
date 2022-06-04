import styled from 'styled-components';
import { PostType } from 'types/post';
import UserPostContent from './UserPostContent';
import UserPostHeader from './UserPostHeader';

const UserPost = ({ post }: { post: PostType }) => {
  return (
    <UserPostArticle>
      <UserPostHeader post={post} />
      <UserPostContent post={post} />
    </UserPostArticle>
  );
};

export default UserPost;

const UserPostArticle = styled.article``;
