import styled from 'styled-components';
import { PostType } from 'types/post';
import UserPostHeader from './UserPostHeader';

const UserPost = ({ post }: { post: PostType }) => {
  return (
    <UserPostArticle>
      <UserPostHeader post={post} />
    </UserPostArticle>
  );
};

export default UserPost;

const UserPostArticle = styled.article``;
