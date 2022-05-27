import React from 'react';
import * as S from './styles';

export interface ButtonPropsType {
  sort: string;
  name?: string;
  navigateToNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonPropsType> = ({ sort, name, navigateToNext, disabled = false }) => {
  return (
    <S.StyledButton sort={sort} name={name} onClick={navigateToNext} disabled={disabled}>
      {name}
    </S.StyledButton>
  );
};

export default Button;
