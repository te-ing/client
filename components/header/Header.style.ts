import Image from 'next/image';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1140px;
  height: 80px;
`;

export const MenuTab = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;

  width: 88px;
  height: 32px;

  background: #89da3d;
  border-radius: 100px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
`;

export const NavButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 32px;
  margin: 0px 16px;
`;

export const Line = styled.div<{ tabNum: number }>`
  position: absolute;
  top: 42px;
  left: ${(props) => (props.tabNum === 1 ? '18px' : props.tabNum === 2 ? '125px' : '230px')};

  width: 75px;
  height: 4px;
  background-color: #abf066;
  transition-duration: 0.4s;
`;

export const AfterLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 40px;
`;

export const SearchBar = styled.input`
  width: 240px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
`;

export const BeforeLogin = styled.div`
  display: flex;
  height: 40px;
`;

export const Login = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px 10px 22px;

  width: 91px;
  height: 40px;
  margin-right: 16px;

  background: #eeeeee;
  border-radius: 30px;

  cursor: pointer;
`;

export const SignUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px 10px 22px;

  width: 105px;
  height: 40px;

  background: #212121;
  border-radius: 30px;

  color: white;

  cursor: pointer;
`;

export const TempAlert = styled.div`
  width: 352px;
  height: 100px;
  background: #bdf486;
  padding: 16px;
`;
