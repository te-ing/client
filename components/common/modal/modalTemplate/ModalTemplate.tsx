import React from 'react';
import * as S from './ModalTemplate.style';

const ModalTemplate: React.FC = ({ children }) => {
  return (
    <S.Wrapper>
      <S.Inner>
        <S.DeleteButton alt="delete_btn" src="/images/icon-delete_btn.svg" width="15.5px" height="15.5px"/>
        {children}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ModalTemplate;
