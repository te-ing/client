import styled from 'styled-components';
import { PostType } from 'types/post';
import Image from 'next/image';
import postsApi from 'apis/posts.api';
import usersApi from 'apis/users.api';
import Login from 'components/Login';
import useModal from 'hooks/useModal';
import { User } from 'types/user';
import { useState } from 'react';
import { isLoggedIn } from 'utils/isLoggedIn';

interface data {
  status?: number;
}
const PostHeaderButtons = ({ post, user }: { post: PostType; user: User }) => {
  const { setModalVisible, isShowing } = useModal();
  const [isLike, setIsLike] = useState(post.isLike);
  const [isScrap, setIsScrap] = useState(post.isScrap);
  const [isFollowed, setIsFollowed] = useState(user.isFollowed);
  const [postId, userId] = [post.id, post.author];
  const isOwnPost = post.author.toString() === sessionStorage.getItem('id');

  const likePost = async () => {
    if (isLoggedIn()) {
      const data: data = await postsApi.likePost(postId, { isRequiredLogin: true });
      if (data.status === 201 || data.status === 204) {
        setIsLike(!isLike);
      }
      return data;
    } else {
      setModalVisible();
    }
  };
  const scrapPost = async () => {
    if (isLoggedIn()) {
      const data: data = await postsApi.scrapPost(postId, { isRequiredLogin: true });
      if (data.status === 201 || data.status === 204) {
        setIsScrap(!isScrap);
      }
      return data;
    } else {
      setModalVisible();
    }
  };
  const followUser = async () => {
    const data: data = await usersApi.followingUser(userId, { isRequiredLogin: true });
    if (data.status === 201 || data.status === 204) {
      setIsFollowed(!isFollowed);
    }
    return data;
  };

  return (
    <HeaderButtonsWrapper>
      <ButtonWrapper onClick={likePost}>
        <ImageWrapper>
          <ButtonImage
            alt="delete_btn"
            src={isLike ? '/images/like.svg' : '/images/like-border.svg'}
            width="30px"
            height="30px"
          />
        </ImageWrapper>
        <ButtonName>좋아요</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper onClick={scrapPost}>
        <ImageWrapper>
          <ButtonImage
            alt="delete_btn"
            src={isScrap ? '/images/scrap.svg' : '/images/scrap-border.svg'}
            width="18px"
            height="18px"
          />
        </ImageWrapper>
        <ButtonName>스크랩</ButtonName>
      </ButtonWrapper>
      {isOwnPost ? (
        ''
      ) : (
        <ButtonWrapper onClick={followUser}>
          <FollowImageWrapper isFollowing={isFollowed}>
            <ButtonImage alt="delete_btn" src="/images/add.svg" width="26px" height="26px" />
          </FollowImageWrapper>
          <ButtonName>팔로우</ButtonName>
        </ButtonWrapper>
      )}
      <Login isShowing={isShowing} setModalVisible={setModalVisible} />
    </HeaderButtonsWrapper>
  );
};

export default PostHeaderButtons;

const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const ImageWrapper = styled.div<{ isFollowing?: boolean }>`
  display: flex;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: #eeeeee;
`;

const FollowImageWrapper = styled(ImageWrapper)<{ isFollowing?: boolean }>`
  background-color: ${(props) => props.isFollowing && '#E4FACC'};
`;

const ButtonImage = styled(Image)``;

const ButtonName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
`;
