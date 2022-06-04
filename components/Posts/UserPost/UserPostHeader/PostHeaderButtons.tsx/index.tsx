import styled from 'styled-components';
import { PostType } from 'types/post';
import Image from 'next/image';
import { ProfileIcon } from 'components/common/Atomic/Profile';
import postsApi from 'apis/posts.api';
import usersApi from 'apis/users.api';
import Login from 'components/Login';
import useModal from 'hooks/useModal';
import { User } from 'types/user';
import { useState } from 'react';

interface data {
  status?: number;
}

const PostHeaderButtons = ({ post, user }: { post: PostType; user: User }) => {
  const { setModalVisible, isShowing } = useModal();
  const [isFollowed, setIsFollowed] = useState(user.isFollowed);
  const [postId, userId] = [post.id, post.author];
  const isOwnPost = post.author.toString() === sessionStorage.getItem('id');

  const likePost = async () => {
    const data: data = await postsApi.likePost(postId, { isRequiredLogin: true });
    if (data.status === 401) setModalVisible();
    return data;
  };
  // 06.04 기준 미구현 API
  const scrapPost = async () => {
    const data: data = await usersApi.scrapUserPosts(userId, { isRequiredLogin: true });
    if (data.status === 401) setModalVisible();
    return data;
  };
  const followUser = async () => {
    const data: data = await usersApi.followingUser(userId, { isRequiredLogin: true });
    data.status === 401 ? setModalVisible() : setIsFollowed(!isFollowed);
    return data;
  };

  return isOwnPost ? (
    <HeaderButtonsWrapper></HeaderButtonsWrapper>
  ) : (
    <HeaderButtonsWrapper>
      <ButtonWrapper onClick={likePost}>
        <ImageWrapper>
          <ButtonImage alt="delete_btn" src="/images/googleLogo.svg" width="30px" height="30px" />
        </ImageWrapper>
        <ButtonName>좋아요</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper onClick={scrapPost}>
        <ImageWrapper>
          <ButtonImage alt="delete_btn" src="/images/kakaoLogo.svg" width="30px" height="30px" />
        </ImageWrapper>
        <ButtonName>스크랩</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper onClick={followUser}>
        <PlusImageWrapper>
          <ProfileIcon
            src={`${user.profileImage ? user.profileImage : '/images/icon-profile.svg'}`}
            width={48}
            height={48}
          />
          <ButtonImageWrapper isFollowing={isFollowed}>
            <ButtonImage alt="delete_btn" src="/images/close_icon.svg" width="8px" height="8px" />
          </ButtonImageWrapper>
        </PlusImageWrapper>
        <ButtonName>팔로우</ButtonName>
      </ButtonWrapper>
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

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: white;
`;

const PlusImageWrapper = styled(ImageWrapper)`
  position: relative;
`;

const ButtonImageWrapper = styled.div<{ isFollowing: boolean }>`
  position: absolute;
  right: -2px;
  bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #abf066;

  transition: all 0.2s linear;
  transform: ${(props) => props.isFollowing && 'rotate(-45deg)'};
`;

const ButtonImage = styled(Image)``;

const ButtonName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
`;
