import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 1140px;
  min-height: 689px;
  padding-top: 240px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.12);
  overflow: scroll;
`;

export const RegisterSubInfo = styled.p`
  margin-bottom: 24px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  color: #757575;
`;

export const RegisterButtonWrapper = styled.div`
  width: 280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const RegisterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  background-color: #e4facc;
  cursor: pointer;
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
  background-color: #bdf486;
  color: #212121;
  cursor: pointer;
`;
