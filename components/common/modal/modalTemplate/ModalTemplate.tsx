import React from 'react';
import * as S from './ModalTemplate.style';

import type { ModalTemplatePropsType } from './ModalTemplate.type';

const ModalTemplate: React.FC<ModalTemplatePropsType> = ({ hide, children }) => {
  return (
    <S.Wrapper>
      <S.Inner>
        <S.DeleteButton alt="delete_btn" src="/images/icon-delete_btn.svg" width="15.5px" height="15.5px" onClick={hide}/>
        {children}
      </S.Inner>
    </S.Wrapper>
  );
};

export default ModalTemplate;
