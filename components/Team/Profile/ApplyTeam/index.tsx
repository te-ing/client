import React from 'react';
import { FollowButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
import { following_icon } from 'constants/imgUrl';
import teamsApi from 'apis/teams.api';
import { useMutation, useQueryClient } from 'react-query';
import { AppliedMemberType } from 'types/team';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';

interface Props {
  checkApplied: AppliedMemberType[];
  teamId: string | string[];
}
const ApplyTeam = ({ checkApplied, teamId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: applyTeam } = useMutation(() => teamsApi.applyTeam(teamId, { isRequiredLogin: true }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['team-profile', teamId]);
    },
  });
  const [userState] = useRecoilState(userInfoState);

  const isApplied = checkApplied.find((member) => member.member === userState.id);
  const applyTeamHandler = () => {
    applyTeam();
  };

  return (
    <FollowButton bgColor onClick={applyTeamHandler}>
      {!isApplied ? (
        <>
          <Image src={following_icon} width={24} height={24} />
          <span>가입신청</span>
        </>
      ) : (
        <span>신청중 ...</span>
      )}
    </FollowButton>
  );
};

export default ApplyTeam;
