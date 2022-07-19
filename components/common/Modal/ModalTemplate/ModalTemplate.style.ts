import styled from 'styled-components';

import Image from 'next/image';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inner = styled.div`
  text-align: right;
  padding: 16px;
  border: 1px solid #c4c3c2;
  border-radius: 2px;
  background-color: #ffffff;
  z-index: 1300;
`;

export const DeleteButton = styled(Image)`
  cursor: pointer;
`;
