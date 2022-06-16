import React from 'react';
import styled from 'styled-components';
import { close_icon } from 'constants/imgUrl';
import Image from 'next/image';
import ManagedMemberCard from '../ManagedMemberCard';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import teamsApi from 'apis/teams.api';
import ExportMemberButton from '../ExportMemberButton';
import MessageButton from '../MessageButton';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';
import membersApi from 'apis/members.api';
interface Props {
  teamId: string;
  onOffHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamMemberModal = ({ teamId, onOffHandler }: Props) => {
  const queryClient = useQueryClient();
  const [userState] = useRecoilState(userInfoState);
  const { isLoading, isError, error, data } = useQuery(['team-member', teamId], () =>
    teamsApi.getTeamMembersManage(teamId)
  );
  const { mutate: deleteTeam } = useMutation(() => teamsApi.deleteTeam(teamId, { isRequiredLogin: true }), {
    onSuccess: () => {
      onOffHandler(false);
      queryClient.invalidateQueries(['team-list']);
    },
  });

  const deleteTeamHandler = () => {
    deleteTeam();
  };
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <Modal>
      <ModalBox>
        <CloseButton onClick={() => onOffHandler(false)}>
          <Image src={close_icon} width={24} height={24} />
        </CloseButton>
        <h1>멤버 관리</h1>
        <p>멤버들에게 메시지를 보내거나 팀장으로서 관리해보세요.</p>
        <ListContainer>
          <div>
            {data
              .filter((member) => member.userId !== userState.id)
              .map((member) => (
                <ManagedMemberCard
                  key={member.userId}
                  memberInfo={member}
                  leftButton={<ExportMemberButton memberId={member.memberId} teamId={teamId} />}
                  rightButton={<MessageButton />}
                />
              ))}
          </div>
          <button onClick={deleteTeamHandler}>팀 삭제</button>
        </ListContainer>
      </ModalBox>
    </Modal>
  );
};

export default TeamMemberModal;

const Modal = styled.div`
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ModalBox = styled.div`
  position: relative;
  width: 414px;
  height: 564px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: 24px;
    line-height: 1.458333;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.color.black};
  }

  & > p {
    width: 205px;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.25;
    margin-bottom: 20px;
    text-align: center;
    color: ${({ theme }) => theme.color.gray_800};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
`;

const ListContainer = styled.div`
  width: 100%;
  & > div {
    height: 400px;
    overflow: auto;
    display: grid;
    row-gap: 8px;
    margin-bottom: 8px;

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 30px;
      display: block;
      background-color: ${({ theme }) => theme.color.gray_200};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background-color: #c4c4c4;
    }
  }

  & > button {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 14px;
    line-height: 1.428571;
    color: ${({ theme }) => theme.color.gray_500};
  }
`;
