import React from 'react';
import * as S from './styles';
import Header from 'components/header';
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <S.Wrapper>{children}</S.Wrapper>
    </>
  );
};

export default Layout;
