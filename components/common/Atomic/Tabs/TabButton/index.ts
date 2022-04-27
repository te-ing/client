import styled, { css, DefaultTheme } from 'styled-components';

export const TabButton = styled.button<{ active: boolean; theme: DefaultTheme }>`
  display: inline-block;
  height: 31px;
  font-size: 16px;
  line-height: 1.448125;
  padding: 4px 12px;
  border-radius: 24px;
  margin-left: 24px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray_300};
  color: ${({ theme }) => theme.color.black};
  span {
    margin-left: 4px;
    color: ${({ theme }) => theme.color.gray_400};
  }
  ${({ active }) => {
    return (
      active &&
      css`
        border: none;
        background-color: ${({ theme }) => theme.color.black};
        color: ${({ theme }) => theme.color.white};
        span {
        }
      `
    );
  }};
`;
