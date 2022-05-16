import styled, { css, DefaultTheme } from 'styled-components';
import { default_banner } from 'constants/imgUrl';
import Image from 'next/image';

export const AddImageWrapper = styled.div<{ editMode?: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ editMode }) => {
    return (
      editMode &&
      css`
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
      `
    );
  }}
`;

export const AddImageSvg = styled(Image).attrs((props) => ({
  src: default_banner,
}))`
  display: block;
  border-radius: 50%;
`;

export const AddImageText = styled.span<{ theme: DefaultTheme }>`
  color: ${(props) => props.theme.color.addTextGray};
  font-size: 14px;
  margin-top: 16px;
`;
