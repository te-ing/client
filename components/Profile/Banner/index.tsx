import React from 'react';

import * as S from './styles';

interface Props {
  bannerImg: string;
}
const Banner: React.FC<Props> = ({ bannerImg, children }) => {
  return <S.BannerWrapper url={bannerImg}>{children}</S.BannerWrapper>;
};

export default Banner;
