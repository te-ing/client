import React from 'react';
import { FollowButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
import { following_icon } from 'constants/imgUrl';
import teamsApi from 'apis/teams.api';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
  teamId: string | string[];
}
const ApplyTeam = ({ teamId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: applyTeam } = useMutation(() => teamsApi.applyTeam(teamId, { isRequiredLogin: true }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['team-profile', teamId]);
    },
  });

  const applyTeamHandler = () => {
    applyTeam();
  };

  return (
    <FollowButton bgColor onClick={applyTeamHandler}>
      <Image src={following_icon} width={24} height={24} />
      <span>가입신청</span>
    </FollowButton>
  );
};

export default ApplyTeam;
