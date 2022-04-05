import React from 'react';
import * as S from './SetUserProfile.style';

import { ReactComponent as ProfileIcon } from '/images/icon-profile.svg';

const SetUserProfile: React.FC = () => {
    return (
        <S.Wrapper>
            <S.InfoHeader>
                <S.Title>프로필을 설정 해주세요</S.Title>
                <S.SubInfo>다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.</S.SubInfo>
            </S.InfoHeader>
            <S.ProfileWrapper>

            </S.ProfileWrapper>
        </S.Wrapper>
    )
}

export default SetUserProfile;