import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Image from 'next/image';
import { useQuery } from 'react-query';
import usersApi from 'apis/users.api';
import Header from 'components/header';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'recoil/auth';
import { team_add_icon } from 'constants/imgUrl';
import TeamCard from 'components/Team/Manangement/TeamCard';
import TeamCreateModal from 'components/Team/Manangement/TeamCreateModal';

const TeamManagement = () => {
  const [userState] = useRecoilState(userInfoState);
  const [teamCreateModal, setTeamCreateModal] = useState<boolean>(false);
  const { isLoading, isError, error, data } = useQuery(
    ['team-list'],
    () => usersApi.getTeamList({ isRequiredLogin: true }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <ManageMent>
      {teamCreateModal && <TeamCreateModal onOffHandler={setTeamCreateModal}></TeamCreateModal>}
      <Header />
      <Wrapper>
        <TeamKind>
          <div>
            <h1>개설한 팀</h1>
            <span>{userState.nickname}님만의 새로운 팀을 만들어 보세요!</span>
          </div>
          <TeamAddButton onClick={() => setTeamCreateModal(true)}>
            <Image src={team_add_icon} width={24} height={24} />
            <span>팀 생성하기</span>
          </TeamAddButton>
        </TeamKind>
        <TeamListContainer>
          {data
            .filter((team) => team.leader === JSON.parse(sessionStorage.getItem('id')))
            .map((team) => (
              <TeamCard key={team.id} teamInfo={team} isLeader={true} />
            ))}
        </TeamListContainer>

        <TeamKind>
          <div>
            <h1>가입한 팀</h1>
          </div>
        </TeamKind>
        <TeamListContainer>
          {data
            .filter((team) => team.leader !== JSON.parse(sessionStorage.getItem('id')))
            .map(
              (team) =>
                team.checkApplied
                  .filter((member) => member.memberType === 'confirmed')
                  .map((member) => member.member)
                  .includes(userState.id) && <TeamCard key={team.id} teamInfo={team} isLeader={false} />
            )}
        </TeamListContainer>
      </Wrapper>
    </ManageMent>
  );
};

export default TeamManagement;

const ManageMent = styled.div`
  background-color: ${({ theme }) => theme.color.gray_200};
  min-height: 100%;
`;
const Wrapper = styled.div`
  max-width: 1092px;
  margin: 0 auto;
`;

const TeamKind = styled.div`
  margin-top: 80px;
  position: relative;
  text-align: right;
  margin-bottom: 40px;
  & div {
    display: flex;
    justify-content: space-between;
  }
  & h1 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: 28px;
    line-height: 1.464285;
    color: ${({ theme }) => theme.color.black};
  }

  & span {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 16px;
    line-height: 1.4375;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.color.black};
  }
`;

const TeamAddButton = styled.button`
  height: 40px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px 10px 22px;
  background-color: #212121;
  & > span {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 1.448125;
    margin-left: 4px;
    color: ${({ theme }) => theme.color.DefaultPrimaryGreen};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.gray_800};
  }
`;

const TeamListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(534px, 1fr));

  row-gap: 24px;
  column-gap: 24px;
`;
