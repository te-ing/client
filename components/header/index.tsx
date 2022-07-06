import { useCallback, useEffect, useState } from 'react';
import * as S from './Header.style';
import Image from 'next/image';
import Login from 'components/Login';
import useModal from 'hooks/useModal';
import { useRecoilState } from 'recoil';
import { User } from 'types/user';
import { userInfoState } from 'recoil/auth';
import usersApi from 'apis/users.api';
import HeaderProfile from './HeaderProfile';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [tabNum, setTabNum] = useState(1);
  const [userInfo, setUserInfo] = useRecoilState<User>(userInfoState);
  const { setModalVisible, isShowing } = useModal();

  const handleLogin = () => {
    setModalVisible();
  };

  const getUserInfo = useCallback(async () => {
    const userIdByStorage = Number(sessionStorage.getItem('id'));
    if (userIdByStorage === 0) {
      setIsLoggedIn(false);
      return;
    }
    const response = await usersApi.getUserInfo(userIdByStorage);
    setUserInfo(response);
  }, []);

  useEffect(() => {
    if (userInfo.id === 0) {
      getUserInfo();
    }
  }, []);

  return (
    <S.Wrapper>
      <S.ButtonWrapper>
        <div style={{ cursor: 'pointer' }} onClick={() => (window.location.href = '/')}>
          <Image src={'/images/logo.svg'} width={'112px'} height={'20px'} />
        </div>
        <S.MenuTab>
          <S.NavButtons
            onClick={() => {
              alert('❗ 아직 구현되지 않은 기능입니다.');
              // setTabNum(1);
            }}
          >
            작업물
          </S.NavButtons>
          <S.NavButtons
            onClick={() => {
              alert('❗ 아직 구현되지 않은 기능입니다.');
              // setTabNum(2);
            }}
          >
            분야
          </S.NavButtons>
          <S.NavButtons
            onClick={() => {
              alert('❗ 아직 구현되지 않은 기능입니다.');
              // setTabNum(3);
            }}
          >
            커뮤니티
          </S.NavButtons>
          <S.Line tabNum={tabNum}></S.Line>
        </S.MenuTab>
        {isLoggedIn ? (
          <S.AfterLogin>
            <div>
              <Image src={'/images/icon-search.svg'} width={'24px'} height={'24px'} alt={'search'} />
            </div>
            <S.SearchBar placeholder="검색어를 입력해주세요" />
            <Image src={'/images/icon-notice.svg'} width={'24px'} height={'24px'} alt={'notice'} />
            <HeaderProfile userInfo={userInfo} />
          </S.AfterLogin>
        ) : (
          <S.BeforeLogin>
            <S.Login onClick={handleLogin}>로그인</S.Login>
            <S.SignUp>회원가입</S.SignUp>
          </S.BeforeLogin>
        )}
        <Login isShowing={isShowing} setModalVisible={setModalVisible} />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default Header;
