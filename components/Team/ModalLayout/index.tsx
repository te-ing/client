import React from 'react';
import styled from 'styled-components';
const ModalLayout = () => {
  return <Modal></Modal>;
};

export default ModalLayout;

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  //   background-color: ${({ theme }) => theme.color.gray_200};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
