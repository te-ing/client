import React from 'react';
import { QuitButton } from 'components/common/Atomic/Tabs/Button';
import { useMutation, useQueryClient } from 'react-query';
import membersApi from 'apis/members.api';

interface Props {
  memberId: number;
  teamId: string | string[];
}

const QuitTeam = ({ memberId, teamId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => membersApi.rejectApply(memberId.toString(), { isRequiredLogin: true }), {
    onSuccess: () => {
      console.log('invalid', teamId);
      queryClient.invalidateQueries(['team-members', teamId]);
      queryClient.invalidateQueries(['team-profile', teamId]);
    },
  });

  const quitTeamHandler = () => {
    mutate();
  };

  return (
    <QuitButton onClick={quitTeamHandler}>
      <span>팀 나가기</span>
    </QuitButton>
  );
};

export default QuitTeam;
