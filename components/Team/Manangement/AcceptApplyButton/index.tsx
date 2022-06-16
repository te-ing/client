import membersApi from 'apis/members.api';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

interface Props {
  memberId: number;
  teamId: string;
}
const AcceptApplyButton = ({ memberId, teamId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: applyMutate } = useMutation(
    () => membersApi.confirmApply(memberId.toString(), { isRequiredLogin: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team-member', teamId]);
        queryClient.invalidateQueries(['team-list']);
      },
    }
  );

  const acceptApplyHandler = () => {
    console.log('수락');
    applyMutate();
  };
  return <AcceptButton onClick={acceptApplyHandler}>수락</AcceptButton>;
};

export default AcceptApplyButton;

const AcceptButton = styled.button`
  width: 153px;
  height: 48px;
  background: ${({ theme }) => theme.color.PressedPrimaryGreen};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 1.4375;
  margin-right: 10px;
`;
