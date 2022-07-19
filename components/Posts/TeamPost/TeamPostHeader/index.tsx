import { useQuery } from 'react-query';
import styled from 'styled-components';
import { TeamPostType } from 'types/post';
import { isLoggedIn } from 'utils/isLoggedIn';
import TeamPostHeaderInfo from './TeamPostHeaderInfo';
import teamsApi from 'apis/teams.api';
import { TeamTypes } from 'types/team';
import SkeletonTeamHeader from './SkeletonHeader SkeletonTeamHeader';
import TeamPostHeaderButtons from './TeamPostHeaderButtons.tsx';

const TeamPostHeader = ({ post }: { post: TeamPostType }) => {
  const getTeamInfo = async () => {
    const data = await teamsApi.checkTeamProfile(post.team, { isRequiredLogin: isLoggedIn() });
    return data;
  };
  const { data, isLoading } = useQuery<TeamTypes>('team', getTeamInfo);
  return !isLoading ? (
    <PostHeader>
      <TeamPostHeaderInfo post={post} team={data} />
      <TeamPostHeaderButtons postId={post.id} />
    </PostHeader>
  ) : (
    <SkeletonTeamHeader />
  );
};

export default TeamPostHeader;

export const PostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 128px;
  padding: 23px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
`;
