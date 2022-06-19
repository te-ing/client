import React from 'react';
import * as S from './CelebrateRegister.style';

import useModal from 'hooks/useModal';
import SetUserProfile from '../SetUserProfile';

const CelebrateRegister = () => {
  const { isNext, navigateToNext } = useModal();

  if (isNext) return <SetUserProfile />;
  else
    return (
      <S.Wrapper>
        <S.Logo alt="selebrate" src="/images/logo.svg" width="120px" height="50px" />
        <S.InfoWrapper>
          <S.Info>가입 성공!</S.Info>
          <S.SubInfo>
            드림인에서 다양한 작품을 업로드하고 <br /> 프로필을 설정하여 자신을 소개해 보세요!
          </S.SubInfo>
          <S.CelebrateImage alt="selebrate" src="/images/celebrate.svg" width="225px" height="250px" />
        </S.InfoWrapper>
        <S.Button onClick={navigateToNext}>프로필 설정하기</S.Button>
      </S.Wrapper>
    );
};

export default CelebrateRegister;
