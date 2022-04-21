import React from 'react';
import * as S from './ImageUploadWrapper.style';
import type { ImageUploadPropsType } from './ImageUploadWrapper.type';

import useImageHandle from '../../../hooks/useImageHandle';

const ImageUploadWrapper: React.FC<ImageUploadPropsType> = ({ children, name }) => {
    const { storeImage } = useImageHandle();

    return (
        <S.Wrapper>
            <S.ProfileLabel htmlFor="file-input">
                {children}
            </S.ProfileLabel>
            <S.FileInput id="file-input" type="file" name={name} onChange={storeImage}/>
        </S.Wrapper>
    )
}

export default ImageUploadWrapper;