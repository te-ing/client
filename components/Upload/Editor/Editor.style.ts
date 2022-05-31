import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 24px 0;
`;

export const EditorWrapper = styled.div`
  position: relative;

  & > span {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.45;
    color: #9e9e9e;
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  min-height: 72px;
  padding: 21.5px 0 20.5px 17px;
  border: 1px solid ${({ theme }) => theme.color.gray_300};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12);

  &::placeholder {
    color: #9e9e9e;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: 20px;
    line-height: 1.45;
    font-family: 'Noto Sans KR';
  }
`;

export const Description = styled.textarea`
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray_100};
  resize: none;
  border: none;
  padding: 16px 17px 0 17px;
  height: 175px;
  &::placeholder {
    font-family: 'Noto Sans KR';
    font-weigth: 400;
    font-size: 20px;
    line-height: 1.45;
  }
`;
