import styled from 'styled-components';
import { PostType } from 'types/post';

const PostHeaderButtons = ({ post }: { post: PostType }) => {
  return <ButtonWrapper></ButtonWrapper>;
};

export default PostHeaderButtons;

const ButtonWrapper = styled.div`
  width: 300px;
  background-color: coral;
`;
