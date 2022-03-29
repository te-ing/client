import React from 'react';
import * as S from './ModalTemplate.style';

const ModalTemplate = ({ children }) => {
    return (
        <S.Container>
            <S.Inner>{children}</S.Inner>
        </S.Container>
    )
}

export default ModalTemplate;