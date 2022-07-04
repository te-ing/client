import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostHeader } from '.';

const SkeletonTeamHeader = () => {
  const [isTimer, setIsTimer] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTimer(true);
    }, 200);
    return () => setIsTimer(true);
  }, []);

  return isTimer ? (
    <PostHeader>
      <InfoWrapper>
        <ProfileWrapper>
          <ProfileIcon src={'/images/icon-profile.svg'} width={82} height={82} />
        </ProfileWrapper>
        <PostInfoWrapper>
          <SkeletonTitle />
          <UserInfoWrapper>
            <SkeletonContent />
          </UserInfoWrapper>
        </PostInfoWrapper>
      </InfoWrapper>
    </PostHeader>
  ) : (
    <PostHeader />
  );
};

export default SkeletonTeamHeader;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const SkeletonTitle = styled.div`
  width: 100px;
  height: 25px;
  background-color: #eeeeee;
`;
const SkeletonContent = styled.div`
  width: 250px;
  height: 25px;
  background-color: #eeeeee;
`;
