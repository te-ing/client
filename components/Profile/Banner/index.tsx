import { team_profile_image, user_profile_image } from 'constants/imgUrl';
import React from 'react';

import * as S from './styles';

interface Props {
  bannerImg: string;
  isTeamPage: boolean;
}
const Banner: React.FC<Props> = ({ bannerImg, children, isTeamPage }) => {
  return (
    <S.BannerWrapper url={bannerImg.length > 0 ? bannerImg : isTeamPage ? team_profile_image : user_profile_image}>
      {children}
    </S.BannerWrapper>
  );
};

export default Banner;
