import React from 'react';
import * as S from './Button.style';
import type { ButtonPropsType } from './Button.type';

const Button: React.FC<ButtonPropsType> = ({ sort, name, navigateToNext }) => (
  <S.StyledButton sort={sort} name={name} onClick={navigateToNext}>
    {name}
  </S.StyledButton>
);

export default Button;
