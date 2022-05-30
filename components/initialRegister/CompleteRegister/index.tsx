import React from 'react';
import * as S from './CompleteRegitser.style';

import Button from '../Button';

import useModal from 'hooks/useModal';

const CompleteRegister = () => {
  const { setModalVisible } = useModal();

  return (
    <S.Wrapper>
      <S.Header>DREAM IN</S.Header>
      <S.InfoWrapper>
        <S.Info>가입 성공!</S.Info>
        <S.SubInfo>
          드림인에서 다양한 작품을 업로드하고 <br /> 프로필을 설정하여 자신을 소개해 보세요!
        </S.SubInfo>
      </S.InfoWrapper>
      <Button sort="setUserComplete" name="프로필 설정하기" navigateToNext={setModalVisible} />
    </S.Wrapper>
  );
};

export default CompleteRegister;
