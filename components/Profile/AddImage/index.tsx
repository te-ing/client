import React from 'react';
import Banner from 'components/Profile/Banner';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { AddImageWrapper, AddImageSvg, AddImageText } from 'components/common/Atomic/AddItem';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';

interface Props {
  editMode: boolean;
  originImg: string;
  bannerImg: string;
  bannerImgUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;

  isTeamPage: boolean;
}

const AddImage: React.FC<Props> = ({ editMode, originImg, bannerImg, bannerImgUpload, isTeamPage }) => {
  return (
    <>
      {editMode ? (
        <Banner bannerImg={bannerImg} isTeamPage={isTeamPage}>
          <ProfileLabel htmlFor="banner-input">
            <AddImageWrapper editMode={editMode}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AddImageSvg priority width={80} height={80} />
                <AddImageText>배너 변경하기</AddImageText>
              </div>
            </AddImageWrapper>
          </ProfileLabel>
          <FileInput id="banner-input" type="file" name="backgroundImage" onChange={bannerImgUpload} />
        </Banner>
      ) : (
        <Banner bannerImg={originImg} isTeamPage={false} />
      )}
      {/* <Banner bannerImg={bannerImg} isTeamPage={isTeamPage}>
        <ProfileLabel htmlFor="banner-input">
          <AddImageWrapper editMode={editMode}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AddImageSvg priority width={80} height={80} />
              <AddImageText>배너 변경하기</AddImageText>
            </div>
          </AddImageWrapper>
        </ProfileLabel>
        <FileInput id="banner-input" type="file" name="backgroundImage" onChange={bannerImgUpload} />
      </Banner> */}
    </>
  );
};

export default AddImage;
