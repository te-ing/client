import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ProfileWrapper } from 'components/common/Atomic/Profile';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';
import { camera_icon, team_profile_icon } from 'constants/imgUrl';

interface Props {
  editMode: boolean;
  originImg: string;
  profileImg: string;
  profileImgUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const TeamProfileImage = ({ editMode, originImg, profileImg, profileImgUpload }: Props) => {
  return (
    <>
      {editMode ? (
        <>
          <ProfileLabel htmlFor="file-input">
            <ProfileWrapper>
              <ImgWrapper
                alt="icon-profile"
                src={profileImg.length ? profileImg : team_profile_icon}
                width={120}
                height={120}
              />
              <CameraIconWrapper>
                <Image alt="icon-camera" src={camera_icon} width={24} height={24} />
              </CameraIconWrapper>
            </ProfileWrapper>
            <FileInput id="file-input" type="file" name="team_profile_image" onChange={profileImgUpload} />
          </ProfileLabel>
        </>
      ) : (
        <ProfileWrapper>
          <ImgWrapper
            alt="icon-profile"
            src={originImg.length > 0 ? originImg : team_profile_icon}
            width={120}
            height={120}
          />
        </ProfileWrapper>
      )}
    </>
  );
};

export default TeamProfileImage;

const ImgWrapper = styled(Image)`
  border-radius: 12px;
`;

const CameraIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  position: absolute;
  left: -18px;
  bottom: -8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray_700};
`;
