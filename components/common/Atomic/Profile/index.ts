import styled, { css, DefaultTheme } from 'styled-components';
import Image from 'next/image';

export const ProfileWrapper = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center';
    align-items: center;
`;
export const ProfileIcon = styled(Image)`
  border-radius: 50%;
`;

export const CameraIcon = styled(Image)``;

export const CameraIconWraper = styled.div<{ direction: string }>`
  width: 36px;
  height: 36px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray_700};

  ${({ direction }) =>
    direction === 'left'
      ? css`
          left: 0;
          bottom: -2px;
        `
      : css`
          top: 2.5px;
          left: 312.99px;
        `}
`;
