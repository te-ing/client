import teamsApi from 'apis/teams.api';
import ItemList from 'components/Profile/ItemList';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

interface Props {
  teamId: string | string[];
  isLeader: boolean;
  editMode?: boolean;
}
const TeamPostList: React.FC<Props> = ({ teamId, isLeader, editMode }) => {
  const { isLoading, isError, error, data } = useQuery(['team-posts', teamId], () => teamsApi.getTeamPosts(teamId));

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return <ItemList editMode={editMode} isLeader={isLeader} dataList={data} isTeam={true} />;
};

export default TeamPostList;
