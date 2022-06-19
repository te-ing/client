import styled from 'styled-components';

import Image from 'next/image';

export const Wrapper = styled.div`
  text-align: center;
`;

export const InfoHeader = styled.header`
  margin-top: 12.25px;
`;

export const Title = styled.p`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 700;
  line-height: 46px;
  letter-spacing: 0.15px;
  color: #5bb028;
`;

export const SubInfo = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0.15px;
  color: #616161;
`;

export const ProfileWrapper = styled.figure`
  position: relative;
  margin-top: 61.25px;
`;

export const ProfileLabel = styled.label`
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ProfileIcon = styled(Image)`
  border-radius: 50%;
`;

export const CameraIconWraper = styled.div`
  position: absolute;
  bottom: 4px;
  left: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 4px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background-color: #424242;
`;

export const UserInfoInputWrapper = styled.form`
  display: flex;
  justify-content: center;
  margin: 24px 0 32px 0;
`;

export const UserInfoInputInner = styled.div`
  text-align: left;

  &:nth-child(1) {
    margin-bottom: 16px;
  }
`;

export const InfoLabel = styled.label`
  display: block;
  margin-bottom: 7px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: #757575;
  cursor: pointer;
`;

export const UserInfoInput = styled.input`
  width: 352px;
  height: 56px;
  padding-left: 17px;
  border: 1px solid #979797;
  border-radius: 4px;
  font-size: 16px;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: #bdbdbd;
  }
`;

export const Alert = styled.p`
  margin: 16px 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: #f83d38;
`;

export const SkipButton = styled.p`
  margin-top: 24px;
  text-align: right;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: #616161;
  cursor: pointer;
`;

export const Button = styled.button`
  min-width: 100%;
  min-height: 56px;
  padding: 16px 165px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
  background-color: #abf066;
  color: #000000;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #bdf486;
  }

  &:disabled {
    color: #b0b0b0;
    background-color: #eeeeee;
    cursor: default;
  }
`;
