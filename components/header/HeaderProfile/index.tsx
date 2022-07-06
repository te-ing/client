import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as S from './HeaderProfile.style';

const HeaderProfile = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const Logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('jwtToken');
    location.reload();
  };

  return (
    <S.Wrapper>
      <S.ProfileImage
        src={userInfo.profileImage ? userInfo.profileImage : '/images/icon-profile.svg'}
        width={'32px'}
        height={'32px'}
        alt={'profile'}
        onClick={() => setIsOpen(!isOpen)}
      />
      <S.Dropdown onMouseLeave={() => setIsOpen(false)} open={isOpen}>
        <S.DropdownItem onClick={() => router.push(`/user/${userInfo.id}`)}>
          <Image src={'/images/icon-profile-sm.svg'} width={'20px'} height={'20px'} alt={'notice'} />
          <S.Label>프로필</S.Label>
        </S.DropdownItem>
        <S.DropdownItem onClick={() => router.push(`/team`)}>
          <Image src={'/images/icon-team-profile-sm.svg'} width={'20px'} height={'20px'} alt={'notice'} />
          <S.Label>팀</S.Label>
        </S.DropdownItem>
        <S.DropdownLogout onClick={Logout}>
          <S.Label>로그아웃</S.Label>
        </S.DropdownLogout>
      </S.Dropdown>
    </S.Wrapper>
  );
};

export default HeaderProfile;
