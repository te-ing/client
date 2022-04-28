import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from './styles';

import AddImage from './AddImage';

import { userRegisterInfoState, UserRegisterInfoType } from 'recoil/auth';

interface Props {
  bannerImg: string;
}
const Banner: React.FC<Props> = ({ bannerImg }) => {
  const [banner, setBanner] = useState<string>();

  return (
    <S.BannerWrapper url={bannerImg}>{!bannerImg && <AddImage text="프로필 배너를 추가 해주세요." />}</S.BannerWrapper>
  );
};

export default Banner;
