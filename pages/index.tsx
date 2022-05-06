import React from 'react';

import Modal from 'components/common/Modal';
import ModalTemplate from 'components/common/Modal/ModalTemplate';
import SetUserProfile from 'components/initialRegister/SetUserProfile';

import useModal from 'hooks/useModal';
import Layout from 'components/Layout';
import { FlexBox } from 'styles/commonStyles';
import styled from 'styled-components';
import { DefaultButton } from 'components/common/Atomic/Tabs/Button';
import MainCard from 'components/common/MainCard';
import Image from 'next/image';

const Index: React.FC = () => {
  const { isShowing, setModalVisible } = useModal();

  // return <Login />;
  return (
    <Layout>
      <MainHeader>
        <SearchBox>
          <SearchInput placeholder="검색어를 입력해주세요." />
          <SearchIcon>
            <Image src={'/images/search.svg'} width="22" height="22" />
          </SearchIcon>
        </SearchBox>
        <FlexBox>
          <FilterBtn>전체보기</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
          <FilterBtn>카테고리</FilterBtn>
        </FlexBox>
      </MainHeader>
      <MainContent>
        {Array.from({ length: 12 }, () => (
          <MainCard />
        ))}
      </MainContent>
      <button onClick={setModalVisible}>test</button>
      <Modal isShowing={isShowing} hide={setModalVisible}>
        <ModalTemplate hide={setModalVisible}>
          <SetUserProfile />
        </ModalTemplate>
      </Modal>
    </Layout>
  );
};

const MainHeader = styled(FlexBox)`
  justify-content: space-between;
  margin: 24px 16px;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 300px;
  border-radius: 4px;
  padding: 10px 12px 10px 36px;
  border: 1px solid #8e8e8e;
  outline: none;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 8px;
`;

const FilterBtn = styled(DefaultButton)`
  width: 80px;
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const MainContent = styled(FlexBox)`
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Index;
