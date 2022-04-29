import styled, { css } from 'styled-components';

export const DefaultButton = styled.button<{ bgColor?: boolean }>`
  height: 40px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ bgColor, theme }) => {
    const color = bgColor ? theme.color.DefaultPrimaryGreen : theme.color.gray_200;
    const pressed = bgColor ? theme.color.PressedPrimaryGreen : theme.color.gray_300;
    return css`
      background-color: ${color};
      &: hover {
        background-color: ${pressed};
      }
      &: active {
        background-color: ${pressed};
      }
    `;
  }}

  & + & {
    margin-left: 16px;
  }

  & > span {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    line-height: 1.448125;
    margin-left: 4px;
  }
`;

export const ProfileEditButton = styled(DefaultButton)`
  padding: 10px 24px 10px 20px;
`;

export const UploadProductButton = styled(DefaultButton)`
  padding: 10px 24px 10px 20px;
`;

export const FollowButton = styled(DefaultButton)`
  padding: 10px 16px;
`;

export const MessageButton = styled(DefaultButton)`
  padding: 10px 16px;
`;
