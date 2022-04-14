import React, { useState } from 'react';
import {
  Wrapper,
  ButtonWrapper,
  MenuTab,
  Logo,
  NavButtons,
  AfterLogin,
  SearchBar,
  BeforeLogin,
  Login,
  SignUp,
} from './Header.style';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Wrapper>
      <ButtonWrapper>
        <MenuTab>
          <Logo>로고입니다</Logo>
          <NavButtons>커뮤니티</NavButtons>
          <NavButtons>메뉴</NavButtons>
          <NavButtons>메뉴</NavButtons>
        </MenuTab>
        {isLoggedIn ? (
          <AfterLogin>
            <div>
              <Image
                src={'/images/icon-search.svg'}
                width={'24px'}
                height={'24px'}
                alt={'search'}
              />
            </div>
            <SearchBar placeholder="검색어를 입력해주세요" />
            <Image src={'/images/icon-notice.svg'} width={'24px'} height={'24px'} alt={'notice'} />
            <Image
              src={'/images/icon-profile.svg'}
              width={'32px'}
              height={'32px'}
              alt={'profile'}
            />
          </AfterLogin>
        ) : (
          <BeforeLogin>
            <Login onClick={() => setIsLoggedIn(true)}>로그인</Login>
            <SignUp>회원가입</SignUp>
          </BeforeLogin>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Header;
