import React from 'react';
import * as S from './ImageUploadWrapper.style';

const ImageUploadWrapper: React.FC = ({ children }) => {
    return (
        <S.Wrapper>
            <S.ProfileLabel htmlFor="file-input">
                {children}
            </S.ProfileLabel>
            <S.FileInput id="file-input" type="file"/>
        </S.Wrapper>
    )
}

export default ImageUploadWrapper;