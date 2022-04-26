import React from 'react';

import * as S from './styles';
import ImageUploadWrapper from 'components/common/ImageUploadWrapper';

interface Props {
  text: string;
}

const AddImage: React.FC<Props> = ({ text }) => {
  return (
    <ImageUploadWrapper name="banner">
      <S.AddImageWrapper>
        <S.AddImageSvg width={80} height={80} />
        <S.AddImageText>{text}</S.AddImageText>
      </S.AddImageWrapper>
    </ImageUploadWrapper>
  );
};

export default AddImage;
