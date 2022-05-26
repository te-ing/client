import React from 'react';
import Banner from 'components/Profile/Banner';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { AddImageWrapper, AddImageSvg, AddImageText } from 'components/common/Atomic/AddItem';
import { FileInput, ProfileLabel } from 'components/common/Atomic/ImageInput';

interface Props {
  editMode: boolean;
  bannerImg: string;
  bannerImgUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  text: string;
}

const AddImage: React.FC<Props> = ({ editMode, bannerImg, bannerImgUpload, text }) => {
  return (
    <Banner bannerImg={bannerImg}>
      <ProfileLabel htmlFor="file-input">
        <AddImageWrapper editMode={editMode}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AddImageSvg priority width={80} height={80} />
            <AddImageText>{text}</AddImageText>
          </div>
        </AddImageWrapper>
      </ProfileLabel>
      <FileInput id="file-input" type="file" name="backgroundImage" onChange={bannerImgUpload} />
    </Banner>
  );
};

export default AddImage;
