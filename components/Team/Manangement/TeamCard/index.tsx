import { ProfileWrapper } from 'components/common/Atomic/Profile';
import { team_profile_icon, user_multiple_icon, setting_icon } from 'constants/imgUrl';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { numberWithCommas } from 'utils/numberWithCommas';
import { TeamTypes } from 'types/team';
import TeamMemberModal from '../TeamMemberModal';
import TeamApplyModal from '../TeamApplyModal';

interface Props {
  teamInfo: TeamTypes;
  isLeader: boolean;
}

const TeamCard = ({ teamInfo, isLeader }: Props) => {
  const [teamMemberModal, setTeamMemberModal] = useState<boolean>(false);
  const [applyModal, setApplyModal] = useState<boolean>(false);

  return (
    <>
      {teamMemberModal && <TeamMemberModal teamId={teamInfo.id} onOffHandler={setTeamMemberModal} />}
      {applyModal && <TeamApplyModal teamId={teamInfo.id} onOffHandler={setApplyModal} />}
      <CardWrapper>
        <Link href={`team/${teamInfo.id}`}>
          <div style={{ cursor: 'pointer' }}>
            <ProfileWrapper>
              <ImgWrapper
                alt="icon-profile"
                src={teamInfo.teamProfileImage.length > 0 ? teamInfo.teamProfileImage : team_profile_icon}
                width={120}
                height={120}
              />
            </ProfileWrapper>
            <TeamInfo>
              <h1>
                {teamInfo.title}
                <p>
                  <Image src={user_multiple_icon} width={24} height={24} />
                </p>
              </h1>
              <p>{teamInfo.description}</p>
              <CountContainer>
                <span>멤버</span>
                <span>{numberWithCommas(teamInfo.memberCount)}</span>
                <span>프로젝트</span>
                <span>{numberWithCommas(teamInfo.postCount)}</span>
              </CountContainer>
            </TeamInfo>
          </div>
        </Link>
        {isLeader && (
          <ManagementSection>
            <Button onClick={() => setTeamMemberModal(true)}>
              <Image src={setting_icon} width={24} height={24} />
              <span>관리하기</span>
            </Button>
            <Button bgColor onClick={() => setApplyModal(true)}>
              <span>
                가입요청<span>{teamInfo.checkApplied.filter((member) => member.memberType === 'pended').length}</span>
              </span>
            </Button>
          </ManagementSection>
        )}
      </CardWrapper>
    </>
  );
};

export default TeamCard;

const CardWrapper = styled.div`
  width: 534px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  padding: 24px;
  & > div {
    display: flex;
  }
`;

const ImgWrapper = styled(Image)`
  border-radius: 12px;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 24px;
  padding: 9px 0;

  & h1 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: 20px;
    line-height: 1.45;
    color: ${({ theme }) => theme.color.profileNameBlack};
    display: flex;
    align-items: center;
    & p {
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }

  & > p {
    line-height: 1.65;
    width: 342px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const CountContainer = styled.div`
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.833333;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.gray_400};
    margin-right: 16px;
  }
  span:nth-child(2n-1) {
    margin-right: 8px;
    color: ${({ theme }) => theme.color.gray_700};
  }
`;

const ManagementSection = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button<{ bgColor?: boolean }>`
  height: 40px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px 10px 22px;

  ${({ bgColor, theme }) => {
    const color = bgColor && theme.color.DefaultPrimaryGreen;
    const pressed = bgColor ? theme.color.PressedPrimaryGreen : theme.color.gray_200;
    const border = !bgColor ? theme.color.gray_400 : 'none';
    return css`
      border: 1px solid ${border};
      background-color: ${color};
      &:hover {
        background-color: ${pressed};
      }
      &:active {
        background-color: ${pressed};
      }
    `;
  }}

  & + & {
    margin-left: 16px;
  }

  & > span {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 1.448125;
    margin-left: 4px;
    & > span {
      color: ${({ theme }) => theme.color.gray_700};
      margin-left: 4px;
    }
  }
`;
