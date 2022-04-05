import React from 'react';
import * as S from './Button.style';
import type { ButtonPropsType } from './Button.type';

const Button: React.FC<ButtonPropsType> = ({ sort, name }) => <S.StyledButton sort={sort}>{name}</S.StyledButton>

export default Button;