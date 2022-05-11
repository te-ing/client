import React from 'react';
import { FollowButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
import { following_icon } from 'constants/imgUrl';

const Following = () => {
  return (
    <FollowButton bgColor>
      <Image src={following_icon} width={24} height={24} />
      <span>팔로우</span>
    </FollowButton>
  );
};

export default Following;
