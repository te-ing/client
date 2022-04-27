import styled, { DefaultTheme } from 'styled-components';
import Image from 'next/image';

export const AddImageWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddImageSvg = styled(Image).attrs((props) => ({
  src: '/images/add_project_default.svg',
}))`
  display: block;
  border-radius: 50%;
`;

export const AddImageText = styled.span<{ theme: DefaultTheme }>`
  color: ${(props) => props.theme.color.addTextGray};
  font-size: 14px;
  margin-top: 16px;
`;
