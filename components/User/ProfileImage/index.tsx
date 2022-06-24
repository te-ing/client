import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { CameraIcon, CameraIconWrapper, ProfileIcon, ProfileWrapper } from 'components/common/Atomic/Profile';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { camera_icon, default_profile } from 'constants/imgUrl';

interface Props {
  editMode: boolean;
  originImg: string;
  profileImg: string;
  profileImgUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ProfileImage = ({ editMode, originImg, profileImg, profileImgUpload }: Props) => {
  return (
    <ProfileImg>
      <ProfileWrapper>
        {editMode ? (
          <>
            <ProfileLabel htmlFor="profile-input">
              <ProfileWrapper>
                <ProfileIcon
                  alt="icon-profile"
                  src={profileImg.length > 0 ? profileImg : default_profile}
                  width={116}
                  height={116}
                />
                <CameraIconWrapper direction="left">
                  <CameraIcon alt="icon-camera" src={camera_icon} width={24} height={24} />
                </CameraIconWrapper>
              </ProfileWrapper>
            </ProfileLabel>
            <FileInput id="profile-input" type="file" name="profileImage" onChange={profileImgUpload} />
          </>
        ) : (
          <ImgWrapper alt="icon-profile" src={!originImg ? default_profile : originImg} width={116} height={116} />
        )}
      </ProfileWrapper>
    </ProfileImg>
  );
};

export default ProfileImage;

const ProfileImg = styled.div``;

const ImgWrapper = styled(Image)`
  border-radius: 50%;
`;
