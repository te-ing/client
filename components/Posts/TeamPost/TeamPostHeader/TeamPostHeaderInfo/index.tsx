import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { TeamPostType } from 'types/post';
import { TeamTypes } from 'types/team';

const TeamPostHeaderInfo = ({ post, team }: { post: TeamPostType; team: TeamTypes }) => {
  const route = useRouter();
  const navigateToTeamPage = () => {
    route.push(`/team/${team.id}`);
  };

  return (
    <InfoWrapper>
      <ProfileWrapper onClick={navigateToTeamPage}>
        <ProfileIcon
          src={`${team.teamProfileImage ? team.teamProfileImage : '/images/icon-profile.svg'}`}
          width={82}
          height={82}
        />
      </ProfileWrapper>
      <PostInfoWrapper>
        <Title>{post.title}</Title>
        <TeamInfoWrapper onClick={navigateToTeamPage}>
          <TeamName>{team.title}</TeamName>
        </TeamInfoWrapper>
      </PostInfoWrapper>
    </InfoWrapper>
  );
};

export default TeamPostHeaderInfo;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
`;

const TeamInfoWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const TeamName = styled.p`
  cursor: pointer;
`;
