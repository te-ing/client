import styled from 'styled-components';
import { PostType } from 'types/post';

const UserPostContent = ({ post }: { post: PostType }) => {
  return (
    <ContentWrapper>
      <PostTextWrapper>{post.title}</PostTextWrapper>
      <PostImageWrapper>
        {post.images.map(({ image }, index) => {
          return <PostImage key={index} src={image} alt={`${post.title} ${index + 1}번째 이미지`} />;
        })}
      </PostImageWrapper>
    </ContentWrapper>
  );
};

export default UserPostContent;

const ContentWrapper = styled.div`
  background: #eeeeee;
`;

const PostTextWrapper = styled.div`
  padding: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const PostImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  gap: 20px;
`;

const PostImage = styled.img`
  display: flex;
  max-width: 100%;
  max-height: 800px;
  object-fit: scale-down;
`;
