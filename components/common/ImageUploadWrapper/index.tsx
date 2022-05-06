import React, { useEffect } from 'react';
import * as S from './ImageUploadWrapper.style';

import useImageHandle from 'hooks/useImageHandle';

export interface ImageUploadPropsType {
  name: string;
  children: JSX.Element;
}

const ImageUploadWrapper = ({ children, name }: ImageUploadPropsType) => {
  const { storeImage } = useImageHandle(name);

  useEffect(() => {
    console.log(name);
    console.log(storeImage);
  }, [name]);

  return (
    <S.Wrapper>
      <S.ProfileLabel htmlFor="file-input">{children}</S.ProfileLabel>
      <S.FileInput id="file-input" type="file" name={name} onChange={storeImage} />
    </S.Wrapper>
  );
};

export default ImageUploadWrapper;
