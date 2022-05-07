import React from 'react';
import * as S from './styles';
import Header from 'components/header';

const Layout = ({ setModalVisible, children }) => {
  return (
    <>
      <Header setModalVisible={setModalVisible} />
      <S.Wrapper>{children}</S.Wrapper>
    </>
  );
};

export default Layout;
