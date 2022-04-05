import React from 'react';
import * as S from './SetUserProfile.style';

import Button from '../button/Button';
import { ReactComponent as ProfileIcon } from '/images/icon-profile.svg';
import { ReactComponent as CameraIcon } from '/images/icon-camera.svg';

const SetUserProfile: React.FC = () => {
    return (
        <S.Wrapper>
            <S.InfoHeader>
                <S.Title>프로필을 설정 해주세요</S.Title>
                <S.SubInfo>다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.</S.SubInfo>
            </S.InfoHeader>
            <S.ProfileWrapper>
                <ProfileIcon />
                <CameraIconWraper>
                    <CameraIcon />
                </CameraIconWraper>
            </S.ProfileWrapper>
            <S.UserInfoInputWrapper>
                <UserInfoInputInner>
                    <InfoLabel>이메일</InfoLabel>
                    <UserInfoInput />
                </UserInfoInputInner>
                <UserInfoInputInner>
                    <InfoLabel>이메일</InfoLabel>
                    <UserInfoInput />
                </UserInfoInputInner>
            </S.UserInfoInputWrapper>
            <Button />
            <SkipButtton />
        </S.Wrapper>
    )
}

export default SetUserProfile;