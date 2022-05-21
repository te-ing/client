import React from 'react';
import styled from 'styled-components';

import { ImgWrapper } from 'pages/profile';

import { default_profile } from 'constants/imgUrl';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import { numberWithCommas } from 'utils/numberWithCommas';

interface Props {
  leftButton: JSX.Element;
  rightButton: JSX.Element;
}

const ManagedMemberCard = ({ leftButton, rightButton }: Props) => {
  return (
    <CardContainer>
      <div>
        <ImgWrapper alt="icon-profile" src={default_profile} width={58} height={58} />

        <InfoSection>
          <h1>멤버명</h1>
          <div>
            <Keyword>일러스트레이션</Keyword>
          </div>
          <CountContainer>
            <span>팔로워</span>
            <span>{numberWithCommas(22222)}</span>
            <span>팔로잉</span>
            <span>{numberWithCommas(2222)}</span>
            <span>작업물</span>
            <span>{numberWithCommas(2222)}</span>
          </CountContainer>
        </InfoSection>
      </div>
      <div>
        {leftButton}
        {rightButton}
      </div>
    </CardContainer>
  );
};

export default ManagedMemberCard;

const CardContainer = styled.div`
  width: 364px;
  height: 194px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 12px;
  padding: 24px;

  & > div {
    display: flex;
    align-items: center;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  margin-bottom: 9px;
  & h1 {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 16px;
    line-height: 1.4375;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.color.profileNameBlack};
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  & > p {
    width: 342px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const CountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.833333;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.gray_400};
    margin-right: 8px;
  }
  span:nth-child(2n-1) {
    margin-right: 4px;
    color: ${({ theme }) => theme.color.gray_700};
  }
`;
