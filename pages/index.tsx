import React from 'react';
import Login from '../components/login/Login';

import Modal from '../components/common/modal/Modal';
import ModalTemplate from '../components/common/modal/modalTemplate/ModalTemplate';

import useModal from '../hooks/useModal';

const Index: React.FC = () => {
  const { isShowing, setModalVisible } = useModal();

  // return <Login />;
  return (
    <>
    <button onClick={setModalVisible}>test</button>
    <Modal isShowing={isShowing} hide={setModalVisible}>
      <ModalTemplate>
        <Login />
      </ModalTemplate>
    </Modal>
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    <Test />
    </>
  )
};

import styled from 'styled-components';

const Test = styled.div`
  background-color: red;
  width: 1000px;
  height: 1000px;
`;

export default Index;
