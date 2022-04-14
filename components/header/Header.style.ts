import styled from 'styled-components';

export const Wrapper = styled.div`
  position: static;
  width: 1920px;
  height: 80px;
  border-bottom: 1px solid gray;
`;

export const ButtonWrapper = styled.div`
  width: 1140px;
  height: 80px;
  margin: auto;
  border: 1px solid gray;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: conter;
  align-items: center;
  padding: 10px 16px;

  position: absolute;
  width: 88px;
  height: 32px;
  left: 24px;
  top: 24px;

  background: #89da3d;
  border-radius: 100px;
`;
