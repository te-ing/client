import React, { useState } from 'react';
import * as S from './styles';
import Image from 'next/image';
import ProfileEdit from '../ProfileEdit';
import {
  ProfileEditButton,
  UploadProductButton,
  FollowButton,
  MessageButton,
} from 'components/common/Atomic/Tabs/Button';
import { Keyword } from 'components/common/Atomic/Tabs/Keyword';
import { numberWithCommas } from 'utils/numberWithCommas';
import UploadProduct from '../UploadProduct';
import { User } from 'types/user';

interface Props {
  info: User;
}
const UserInfo: React.FC<Props> = ({ info }) => {
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
  const [followers, setFollowers] = useState<number>(10214);
  const [followings, setFollowings] = useState<number>(35150);
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
        <Image
          src={!info.profileImage ? '/images/profile_off.svg' : info.profileImage}
          onClick={handler}
          width={120}
          height={120}
        />
      </S.ProfileImg>
      <S.InfoSection>
        <h1>{info.nickname}</h1>
        <S.InfoDescription>
          <div>
            {info.categories.map((ability) => (
              <Keyword key={ability.id}>{ability.name}</Keyword>
            ))}
          </div>
          <S.FollowInfo>
            <span>팔로워</span>
            <span>{numberWithCommas(info.followerCount)}</span>
            <span>팔로잉</span>
            <span>{numberWithCommas(info.followingCount)}</span>
          </S.FollowInfo>
          <p>{info.description}</p>
        </S.InfoDescription>
      </S.InfoSection>
      <S.InfoAside>
        <ProfileEdit />
        <UploadProduct />
      </S.InfoAside>
    </S.InfoWrapper>
  );
};

export default UserInfo;
