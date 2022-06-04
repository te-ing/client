import styled from 'styled-components';
import { PostType } from 'types/post';
import Image from 'next/image';
import { ProfileIcon } from 'components/common/Atomic/Profile';

const PostHeaderButtons = ({ post, profileImage }: { post: PostType; profileImage: string }) => {
  return (
    <HeaderButtonsWrapper>
      <ButtonWrapper>
        <ImageWrapper>
          <ButtonImage
            alt="delete_btn"
            src="/images/googleLogo.svg"
            width="30px"
            height="30px"
            // onClick={}
          />
        </ImageWrapper>
        <ButtonName>좋아요</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper>
        <ImageWrapper>
          <ButtonImage
            alt="delete_btn"
            src="/images/kakaoLogo.svg"
            width="30px"
            height="30px"
            // onClick={}
          />
        </ImageWrapper>
        <ButtonName>스크랩</ButtonName>
      </ButtonWrapper>

      <ButtonWrapper>
        <PlusImageWrapper>
          <ProfileIcon src={`${profileImage ? profileImage : '/images/icon-profile.svg'}`} width={48} height={48} />
          <ButtonImageWrapper isFollowing={true}>
            <ButtonImage alt="delete_btn" src="/images/close_icon.svg" width="8px" height="8px" />
          </ButtonImageWrapper>
        </PlusImageWrapper>
        <ButtonName>팔로우</ButtonName>
      </ButtonWrapper>
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
