import membersApi from 'apis/members.api';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

interface Props {
  memberId: number;
  teamId: string;
}

const RejectApplyButton = ({ memberId, teamId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: applyMutate } = useMutation(
    () => membersApi.rejectApply(memberId.toString(), { isRequiredLogin: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team-member', teamId]);
        queryClient.invalidateQueries(['team-list']);
      },
    }
  );

  const rejectApplyHandler = () => {
    console.log('거절');
    applyMutate();
  };
  return <RejectButton onClick={rejectApplyHandler}>거절</RejectButton>;
};

export default RejectApplyButton;

const RejectButton = styled.button`
  width: 153px;
  height: 48px;
  background: ${({ theme }) => theme.color.gray_200};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 1.4375;
  margin-right: 10px;
`;
