import React from 'react';
import * as S from './Button.style';

export interface ButtonPropsType {
  sort: string;
  name?: string;
  navigateToNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonPropsType> = ({ sort, name, navigateToNext }) => {
  return (
    <S.StyledButton sort={sort} name={name} onClick={navigateToNext}>
      {name}
    </S.StyledButton>
  );
};

export default Button;
