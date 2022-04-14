import React from 'react';
import { Wrapper, ButtonWrapper, Logo } from './Header.style';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <ButtonWrapper>
        <Logo>로고입니다</Logo>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Header;
