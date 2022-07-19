import styled from 'styled-components';
import { TeamPostType } from 'types/post';
import Image from 'next/image';

const TeamPostContent = ({ post }: { post: TeamPostType }) => {
  return (
    <ContentWrapper>
      <PostTextWrapper>{post.description}</PostTextWrapper>
      <PostImages>
        {post.images.map(({ image }, index) => {
          return (
            <PostImageWrapper key={index}>
              <PostImage layout="fill" src={image} alt={`${post.title} ${index + 1}번째 이미지`} />
            </PostImageWrapper>
          );
        })}
      </PostImages>
    </ContentWrapper>
  );
};

export default TeamPostContent;

const ContentWrapper = styled.div`
  background: #eeeeee;
`;

const PostTextWrapper = styled.div`
  padding: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

const PostImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  gap: 20px;
`;

const PostImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  span {
    position: unset !important;
  }
`;

const PostImage = styled(Image)`
  object-fit: fill;
  width: unset !important;
  position: relative !important;
  height: 100% !important;
`;
