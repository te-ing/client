import React from 'react';
import { FollowButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
const Following = () => {
  return (
    <FollowButton bgColor>
      <Image src="/images/icon-add-round.svg" width={24} height={24} />
      <span>팔로우</span>
    </FollowButton>
  );
};

export default Following;
