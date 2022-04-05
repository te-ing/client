import React from 'react';
import * as S from './Button.style';
import type { StyledButtonPropsType } from './Button.type';

const Button: React.FC<StyledButtonPropsType> = props => <S.StyledButton {...props} />

export default Button;