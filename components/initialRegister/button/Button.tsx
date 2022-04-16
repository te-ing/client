import React from 'react';
import * as S from './Button.style';
import type { ButtonPropsType } from './Button.type';

const Button: React.FC<ButtonPropsType> = ({ sort, name, navigateToInterest }) => <S.StyledButton sort={sort} onClick={navigateToInterest}>{name}</S.StyledButton>


export default Button;