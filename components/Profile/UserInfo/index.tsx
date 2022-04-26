import React, { useState } from 'react';
import * as S from './styles';
import Image from 'next/image';
import {
  ProfileEditButton,
  UploadProductButton,
  FollowButton,
  MessageButton,
} from 'components/common/Atomic/Tabs/Button';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';

const UserInfo = () => {
  const [userName, setUserName] = useState<string>('Andre');
  const [abilties, setAbiliies] = useState<string[]>([
    '일러스트레이션',
    '그래픽 디자인',
    '일러스트레이션',
    '그래픽 디자인',
    '일러스트레이션',
    '그래픽 디자인',
    '일러스트레이션',
    '그래픽 디자인',
    '일러스트레이션',
    '그래픽',
    '마케팅',
  ]);
  const [followers, setFollowers] = useState<string>('10,214');
  const [followings, setFollowings] = useState<string>('35,150');
  const [currentUser, setCurrentUser] = useState<boolean>(false);
  const [intro, setIntro] = useState<string>(
    '사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.사용자 소개입니다.'
  );
  const handler = () => {
    setCurrentUser(!currentUser);
  };
  return (
    <S.InfoWrapper>
      <S.ProfileImg>
        <Image src="/images/profile_off.svg" onClick={handler} width={120} height={120} />
      </S.ProfileImg>
      <S.InfoSection>
        <h1>{userName}</h1>
        <S.InfoDescription>
          <div style={{ width: '400px' }}>
            {abilties.map((ability, i) => (
              <Keyword key={i}>{ability}</Keyword>
            ))}
          </div>
          <S.FollowInfo>
            <span>팔로워</span>
            <span>{followers}</span>
            <span>팔로잉</span>
            <span>{followings}</span>
          </S.FollowInfo>
          <p>{intro}</p>
        </S.InfoDescription>
      </S.InfoSection>
      <S.InfoAside>
        {currentUser ? (
          <>
            {' '}
            <ProfileEditButton>
              <Image src="/images/profile-edit.svg" width={24} height={24} />
              <span>프로필 수정</span>
            </ProfileEditButton>
            <UploadProductButton bgColor>
              <Image src="/images/profile-edit-write2.svg" width={24} height={24} />
              <span>작품 업로드</span>
            </UploadProductButton>
          </>
        ) : (
          <>
            <FollowButton bgColor>
              <Image src="/images/icon-add-round.svg" width={24} height={24} />
              <span>팔로우</span>
            </FollowButton>
            <MessageButton>
              <Image src="/images/icon-message.svg" width={24} height={24} />
              <span>메시지</span>
            </MessageButton>
          </>
        )}
      </S.InfoAside>
    </S.InfoWrapper>
  );
};

export default UserInfo;
