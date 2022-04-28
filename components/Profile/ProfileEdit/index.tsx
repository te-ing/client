import React from 'react';
import { ProfileEditButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
const ProfileEdit = () => {
  return (
    <ProfileEditButton>
      <Image src="/images/profile-edit.svg" width={24} height={24} />
      <span>프로필 수정</span>
    </ProfileEditButton>
  );
};

export default ProfileEdit;
