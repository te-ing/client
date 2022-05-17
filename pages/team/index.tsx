import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import Image from 'next/image';
import { useQuery } from 'react-query';
import usersApi from 'apis/users.api';
import { useRecoilState } from 'recoil';
import { socialLoginState } from 'recoil/auth';
import { team_add_icon } from 'constants/imgUrl';
import TeamCreate from 'components/Team/TeamCreate';

const TeamManagement = () => {
  const [loginState] = useRecoilState(socialLoginState);
  const [teamCreateModal, setTeamCreateModal] = useState<boolean>(false);
  const { isLoading, isError, error, data } = useQuery(['team-list'], () =>
    usersApi.getTeamList({ isRequiredLogin: true })
  );

  return (
    <ManageMent>
      {teamCreateModal && <TeamCreate onOffHandler={setTeamCreateModal}></TeamCreate>}

      <Layout>
        <TeamKind>
          <div>
            <h1>개설한 팀</h1>
            <span>123님만의 새로운 팀을 만들어 보세요!</span>
          </div>
          <TeamAddButton onClick={() => setTeamCreateModal(true)}>
            <Image src={team_add_icon} width={24} height={24} />
            <span>팀 생성하기</span>
          </TeamAddButton>
        </TeamKind>
        <TeamKind>
          <h1>가입한 팀</h1>
        </TeamKind>
      </Layout>
    </ManageMent>
  );
};

export default TeamManagement;

const ManageMent = styled.div`
  background-color: ${({ theme }) => theme.color.gray_200};
  height: 100vh;
`;

const TeamKind = styled.div`
  margin-top: 80px;
  position: relative;
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

export const TeamAddButton = styled.button`
  position: absolute;
  right: 0px;
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
