import React from 'react';
import * as S from './ModalTemplate.style';

const ModalTemplate = ({ children }) => {
  return (
    <S.Wrapper>
      <S.Inner>{children}</S.Inner>
    </S.Wrapper>
  );
};

export default ModalTemplate;
