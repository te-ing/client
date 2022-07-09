import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { default_profile } from 'constants/imgUrl';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import { numberWithCommas } from 'utils/numberWithCommas';
import { MemberTypes } from 'types/team';
interface Props {
  memberInfo: MemberTypes;
}

const MemberCard = ({ memberInfo }: Props) => {
  return (
    <Link href={`/user/${memberInfo.userId}`}>
      <CardContainer>
        <ProfileImg src={memberInfo.image.length > 0 ? memberInfo.image : default_profile} width={56} height={56} />
        <span>{memberInfo.nickname}</span>
        <KeywordsConatiner>
          {memberInfo.subCategory.map((category, i) => (
            <Keyword key={i}>{category.subCategory}</Keyword>
          ))}
          {memberInfo.subCategory.length > 3 && <Keyword>...</Keyword>}
        </KeywordsConatiner>
        <FollowInfo>
          <span>팔로워</span>
          <span>{numberWithCommas(memberInfo.followerCount)}</span>
          <span>팔로잉</span>
          <span>{numberWithCommas(memberInfo.followingCount)}</span>
          <span>작업물</span>
          <span>{numberWithCommas(memberInfo.postCount)}</span>
        </FollowInfo>
      </CardContainer>
    </Link>
  );
};

export default MemberCard;

const CardContainer = styled.a`
  width: 364px;
  background-color: ${({ theme }) => theme.color.white};
  padding: 16px 0;
  //   padding: 16px 64px;
  border: 1px solid ${({ theme }) => theme.color.gray_400};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.237602);
  }

  &:active {
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.237602);
  }
  & > span {
    margin-top: 8px;
    margin-bottom: 12px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 16px;
    line-height: 1.4375;
    letter-spacing: 0.02em;
  }
`;

const ProfileImg = styled(Image)`
  border-radius: 50%;
`;

const KeywordsConatiner = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const FollowInfo = styled.div`
  margin-bottom: 8px;
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.833333;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.gray_700};
    margin-right: 16px;
  }

  span:nth-child(2n-1) {
    margin-right: 4px;
  }
`;
