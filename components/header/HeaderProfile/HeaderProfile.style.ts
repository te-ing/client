import Image from 'next/image';
import styled from 'styled-components';
import { FlexBox, FlexColumn } from 'styles/commonStyles';

export const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

export const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

export const Dropdown = styled(FlexColumn)<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  top: 40px;
  right: 0;
  align-items: center;
  width: 150px;
  padding: 10px;
  gap: 5px;
  background-color: #ffffff;
  border: 1px solid #efefef;
  border-radius: 12px;
  z-index: 5;
`;

export const DropdownItem = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  gap: 10px;
  border-radius: 50px;
  &:hover {
    background-color: #eeeeee;
  }
`;

export const DropdownLogout = styled(DropdownItem)`
  color: #616161;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #424242;
  }
`;

export const Label = styled.span`
  font-weight: 700;
  width: 4em;
`;
