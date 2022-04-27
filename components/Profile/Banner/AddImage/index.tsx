import React from 'react';

import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import { AddImageWrapper, AddImageSvg, AddImageText } from 'components/common/Atomic/AddItem';

interface Props {
  text: string;
}

const AddImage: React.FC<Props> = ({ text }) => {
  return (
    <ImageUploadWrapper name="banner">
      <AddImageWrapper>
        <AddImageSvg width={80} height={80} />
        <AddImageText>{text}</AddImageText>
      </AddImageWrapper>
    </ImageUploadWrapper>
  );
};

export default AddImage;
