import Image from 'next/image';
import styled from 'styled-components';
import { FlexBox, FlexColumn } from 'styles/commonStyles';

interface ButtonStyle {
  background?: string;
  color?: string;
  border?: string;
}

export const Outside = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: #0000004c;
`;

export const Section = styled(FlexColumn)`
  position: absolute;
  top: 0;
  right: 0;
  width: 258px;
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
  padding: 40px 16px;
  z-index: 100;
`;

export const Wrapper = styled(FlexColumn)`
  justify-content: center;
`;

export const ProfileLabel = styled.span`
  text-align: center;
  font-weight: 700;
  padding: 8px;
`;

export const ButtonWrapper = styled(FlexBox)<{ height?: number }>`
  justify-content: center;
  height: ${({ height = 100 }) => `${height}px`};
  align-items: center;
  gap: 12px;
`;

export const ImageButton = styled(Image)`
  cursor: pointer;
`;

export const LoggedInButtonWrapper = styled(FlexColumn)`
  gap: 8px;
  padding-bottom: 24px;
`;

export const Button = styled.button<ButtonStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  background: ${({ background }) => (background ? background : '#eeeeee')};
  color: ${({ color }) => color};
  border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
  border-radius: 30px;
`;

export const TabWrapper = styled(FlexColumn)`
  border-top: 1px solid #e0e0e0;
  gap: 10px;
  padding: 20px 0;
`;

export const Tab = styled.div<{ currentTab: number }>`
  padding: 15px 0;
  box-sizing: border-box;
  :nth-child(${({ currentTab }) => currentTab}) {
    border-bottom: 4px solid #abf066;
  }
`;
