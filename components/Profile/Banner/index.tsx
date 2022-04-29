import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from './styles';

import AddImage from './AddImage';

import { userRegisterInfoState, UserRegisterInfoType } from 'recoil/auth';

interface Props {
  editMode: boolean;
  bannerImg: string;
}
const Banner: React.FC<Props> = ({ editMode, bannerImg }) => {
  return (
    <S.BannerWrapper url={bannerImg}>
      {(!bannerImg || editMode) && (
        <AddImage editMode={editMode} text={!editMode ? '프로필 배너를 추가 해주세요.' : '배너 변경하기'} />
      )}
    </S.BannerWrapper>
  );
};

export default Banner;
