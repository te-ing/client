import React from 'react';
import styled from 'styled-components';
const ExportMember = () => {
  return <ExportButton>내보내기</ExportButton>;
};

export default ExportMember;

const ExportButton = styled.button`
  width: 153px;
  height: 48px;
  background: ${({ theme }) => theme.color.gray_200};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  line-height: 1.4375;
  margin-right: 10px;
`;
