import React from 'react';

import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { AddImageWrapper, AddImageSvg, AddImageText } from 'components/common/Atomic/AddItem';

interface Props {
  editMode: boolean;
  text: string;
}

const AddImage: React.FC<Props> = ({ editMode, text }) => {
  return (
    <AddImageWrapper editMode={editMode}>
      <ImageUploadWrapper name="banner">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AddImageSvg priority width={80} height={80} />
          <AddImageText>{text}</AddImageText>
        </div>
      </ImageUploadWrapper>
    </AddImageWrapper>
  );
};

export default AddImage;
