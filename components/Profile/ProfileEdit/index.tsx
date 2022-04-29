import React from 'react';
import { ProfileEditButton } from 'components/common/Atomic/Tabs/Button';
import Image from 'next/image';
import { UseMutateFunction } from 'react-query';
import { AxiosResponse } from 'axios';

interface Props {
  editMode: boolean;
  editModeOnOff: (flag: boolean) => () => void;
  userInfoMutate: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>;
}
const ProfileEdit: React.FC<Props> = ({ editMode, editModeOnOff, userInfoMutate }) => {
  return (
    <ProfileEditButton bgColor={editMode} onClick={editMode ? editModeOnOff(false) : editModeOnOff(true)}>
      <Image src="/images/profile-edit.svg" width={24} height={24} />
      <span>{editMode ? '수정 완료' : '프로필 수정'}</span>
    </ProfileEditButton>
  );
};

export default ProfileEdit;
