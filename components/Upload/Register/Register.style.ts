import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 1140px;
  min-height: 689px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12);
  overflow: scroll;
`;

export const ImageContainer = styled.div<{ img: string }>`
  position: relative;
  background-image: ${(props) => props.img && `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 400px;

  & > div {
    position: absolute;
    top: 40px;
    right: 24px;
    display: flex;
    flex-direction: column;
  }
`;

export const RegisterWrapper = styled.div`
  position: relative;
  top: 240px;
`;

export const RegisterSubInfo = styled.p`
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  margin-bottom: 24px;
  color: #757575;
`;

export const RegisterButtonWrapper = styled.div`
  width: 280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const RegisterButton = styled.button<{ width: string; height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 12px;
  background-color: #e4facc;
  cursor: pointer;
  margin-bottom: 24px;
  &: hover {
    background-color: ${({ theme }) => theme.color.PressedPrimaryGreen};
  }
  &: active {
    background-color: ${({ theme }) => theme.color.PressedPrimaryGreen};
  }
`;

export const UploadButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 161px;
  height: 48px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
  background-color: ${({ theme }) => theme.color.DefaultPrimaryGreen};
  color: #212121;
  cursor: pointer;

  &: hover {
    background-color: ${({ theme }) => theme.color.PressedPrimaryGreen};
  }
  &: active {
    background-color: ${({ theme }) => theme.color.PressedPrimaryGreen};
  }
`;
