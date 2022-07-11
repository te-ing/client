import teamsApi from 'apis/teams.api';
import usersApi from 'apis/users.api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { FlexBox, FlexCenter, FlexColumn, TextBox } from 'styles/commonStyles';
import { PostType } from 'types/post';
import { TeamTypes } from 'types/team';
import { User } from 'types/user';

interface Props {
  post: PostType;
  type: string;
}

const MainCard = ({ post, type }: Props) => {
  const router = useRouter();
  const getAuthor = () => usersApi.getUserInfo(post.author);
  const getTeamProfile = () => teamsApi.checkTeamProfile(post.team);
  const { data } =
    type === 'user'
      ? useQuery<User>(post.id.toString(), getAuthor)
      : useQuery<TeamTypes>(post?.team?.toString(), getTeamProfile);
  const isUser = (data: User | TeamTypes): data is User => (data as User)?.nickname !== undefined; // 타입가드

  return (
    <Wrapper>
      <PreviewImageBox onClick={() => router.push(`/post/${type === 'user' ? post.id : `/team/${post.id}`}`)}>
        <Image src={post.images[0]?.image || '/images/logo.svg'} layout="fill" objectFit="cover" />
        <PreviewImageBoxLayer />
        <PostTitle>{post.title}</PostTitle>
      </PreviewImageBox>
      <CardInfo>
        {isUser(data) ? (
          <InfoUserBox onClick={() => router.push(`/user/${post.author}`)}>
            <ProfileImageBox>
              <Image src={data?.profileImage || '/images/icon-profile.svg'} width={32} height={32} />
            </ProfileImageBox>
            <TextBox size="20" weight={600}>
              {data?.nickname}
            </TextBox>
          </InfoUserBox>
        ) : (
          <InfoUserBox onClick={() => router.push(`/team/${post.team}`)}>
            <ProfileImageBox>
              <Image src={data?.teamProfileImage || '/images/icon-profile.svg'} width={32} height={32} />
            </ProfileImageBox>
            <TextBox size="20" weight={600}>
              {data?.title}
            </TextBox>
          </InfoUserBox>
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
