import React from 'react';
import { ProfileEditButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';

interface Props {
  editMode: boolean;
  editModeOnOff: (flag: boolean) => () => void;
}
const ProfileEdit: React.FC<Props> = ({ editMode, editModeOnOff }) => {
  return (
    <ProfileEditButton bgColor={editMode} onClick={editMode ? editModeOnOff(false) : editModeOnOff(true)}>
      <Image src="/images/profile-edit.svg" width={24} height={24} />
      <span>{editMode ? '수정 완료' : '프로필 수정'}</span>
    </ProfileEditButton>
  );
};

export default ProfileEdit;
