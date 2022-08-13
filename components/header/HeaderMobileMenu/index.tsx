import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as S from './HeaderMobileMenu.style';

const HeaderMobileMenu = ({ login, tab, isLoggedIn, userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const Logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('jwtToken');
    router.push(`/`);
    location.reload();
  };

  const handleIsOpen = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setIsOpen(false);
  };

  return isOpen ? (
    <S.Outside onClick={handleIsOpen}>
      <S.Section>
        {isLoggedIn ? (
          <S.Wrapper>
            <S.ImageButton
              src={userInfo.profileImage ? userInfo.profileImage : '/images/icon-profile.svg'}
              width={'80px'}
              height={'80px'}
              alt={'profile'}
              onClick={() => router.push(`/user/${userInfo.id}`)}
            />
            <S.ProfileLabel>{userInfo.nickname}</S.ProfileLabel>
            <S.LoggedInButtonWrapper>
              <S.ButtonWrapper height={40}>
                <S.ImageButton src={'/images/icon-message.svg'} width={'24px'} height={'24px'} alt={'notice'} />
                <S.ImageButton src={'/images/icon-notice.svg'} width={'24px'} height={'24px'} alt={'notice'} />
              </S.ButtonWrapper>
              <S.Button onClick={() => router.push(`/user/${userInfo.id}`)}>
                <Image src={'/images/icon-profile-sm.svg'} width={'20px'} height={'20px'} alt={'notice'} />
                <span>프로필</span>
              </S.Button>
              <S.Button onClick={() => router.push(`/team`)}>
                <Image src={'/images/icon-team-profile-sm.svg'} width={'20px'} height={'20px'} alt={'notice'} />
                <span>팀</span>
              </S.Button>
              <S.Button onClick={Logout} border="#bdbdbd" background="white">
                <span>로그아웃</span>
              </S.Button>
            </S.LoggedInButtonWrapper>
          </S.Wrapper>
        ) : (
          <S.Wrapper>
            <Image src={'/images/logo_main.svg'} width={'130px'} height={'90px'} />
            <S.ButtonWrapper>
              <S.Button color="black" onClick={login}>
                로그인
              </S.Button>
              <S.Button color="white" background="black" onClick={login}>
                회원가입
              </S.Button>
            </S.ButtonWrapper>
          </S.Wrapper>
        )}
        <S.TabWrapper>
          <S.Tab currentTab={tab}>작업물</S.Tab>
          <S.Tab currentTab={tab}>분야</S.Tab>
          <S.Tab currentTab={tab}>커뮤니티</S.Tab>
        </S.TabWrapper>
      </S.Section>
    </S.Outside>
  ) : (
    <button onClick={() => setIsOpen(true)}>
      <Image src={'/images/icon-menu.svg'} width={'22px'} height={'22px'} />
    </button>
  );
};

export default HeaderMobileMenu;
