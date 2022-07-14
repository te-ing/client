import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FlexBox, FlexCenter, FlexColumn, TextBox } from 'styles/commonStyles';
import { PostCardType } from 'types/post';

interface Props {
  post: PostCardType;
}

const MainCard = ({ post }: Props) => {
  return (
    <Wrapper>
      {post.author ? (
        <Link href={`/post/${post.id}`}>
          <PreviewImageBox>
            <Image src={post.images[0]?.image || '/images/logo.svg'} layout="fill" objectFit="cover" />
            <PreviewImageBoxLayer />
            <PostTitle>{post.title}</PostTitle>
          </PreviewImageBox>
        </Link>
      ) : (
        <Link href={`/post/team/${post.id}`}>
          <PreviewImageBox>
            <Image src={post.images[0]?.image || '/images/logo.svg'} layout="fill" objectFit="cover" />
            <PreviewImageBoxLayer />
            <PostTitle>{post.title}</PostTitle>
          </PreviewImageBox>
        </Link>
      )}
      <CardInfo>
        {post.author ? (
          <Link href={`/user/${post.author.id}`}>
            <InfoUserBox>
              <ProfileImageBox>
                <Image src={post.author.profileImage || '/images/icon-profile.svg'} width={32} height={32} />
              </ProfileImageBox>
              <TextBox size="20" weight={600}>
                {post.author.nickname}
              </TextBox>
            </InfoUserBox>
          </Link>
        ) : (
          <Link href={`/team/${post.team.id}`}>
            <InfoUserBox>
              <ProfileImageBox>
                <Image src={post.team.teamProfileImage || '/images/icon-profile.svg'} width={32} height={32} />
              </ProfileImageBox>
              <TextBox size="20" weight={600}>
                {post.team.title}
              </TextBox>
            </InfoUserBox>
          </Link>
        )}
        <FlexBox>
          <InfoImageBox>
            <Image
              alt="like"
              src={post.isLike ? '/images/like-small.svg' : '/images/like-border-small.svg'}
              width="16px"
              height="16px"
            />
            <CountInfo>{post.likeCount}</CountInfo>
          </InfoImageBox>
          <InfoImageBox>
            <Image
              alt="scrap"
              src={post.isScrap ? '/images/scrap-small.svg' : '/images/scrap-border-small.svg'}
              width="16px"
              height="16px"
            />
            <CountInfo>{post.scrapCount}</CountInfo>
          </InfoImageBox>
        </FlexBox>
      </CardInfo>
    </Wrapper>
  );
};

const Wrapper = styled(FlexColumn)`
  width: 364px;
  height: 328px;
  margin-bottom: 24px;
  margin: 10px;
`;

const PreviewImageBox = styled(FlexCenter)`
  position: relative;
  height: 250px;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #8e8e8e;
  background-color: ${({ theme }) => theme.color.gray_500};
  cursor: pointer;
`;

const PreviewImageBoxLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 0) 100%);
`;

const PostTitle = styled.span`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: white;
  font-weight: 500;
`;

const CardInfo = styled(FlexBox)`
  justify-content: space-between;
  padding: 16px 0 0;
`;

const InfoUserBox = styled(FlexCenter)`
  cursor: pointer;
`;

const ProfileImageBox = styled.div`
  border-radius: 50%;
  margin-right: 8px;
  overflow: hidden;
`;

const InfoImageBox = styled(FlexBox)`
  align-self: center;
  margin-right: 8px;
  gap: 2px;
`;

const CountInfo = styled.span`
  font-size: 14px;
  align-self: center;
  color: #757575;
`;

export default MainCard;
