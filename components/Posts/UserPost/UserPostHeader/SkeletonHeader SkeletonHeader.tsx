import { ProfileIcon } from 'components/common/Atomic/Profile';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostHeader } from '.';

const SkeletonHeader = () => {
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
      <HeaderButtonsWrapper>
        <ButtonWrapper>
          <SkeletonIcon />
          <SkeletonText />
        </ButtonWrapper>
        <ButtonWrapper>
          <SkeletonIcon />
          <SkeletonText />
        </ButtonWrapper>
        <ButtonWrapper>
          <SkeletonIcon />
          <SkeletonText />
        </ButtonWrapper>
      </HeaderButtonsWrapper>
    </PostHeader>
  ) : (
    <PostHeader />
  );
};

export default SkeletonHeader;

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

const HeaderButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
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
const SkeletonText = styled.div`
  width: 30px;
  height: 15px;
`;

const SkeletonIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: #eeeeee;
`;
