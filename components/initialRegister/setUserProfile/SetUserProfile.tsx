import React from 'react';
import * as S from './SetUserProfile.style';

import Image from 'next/image';

import Button from '../button/Button';

const SetUserProfile: React.FC = () => {
    return (
        <S.Wrapper>
            <S.InfoHeader>
                <S.Title>프로필을 설정 해주세요</S.Title>
                <S.SubInfo>다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.</S.SubInfo>
            </S.InfoHeader>
            <S.ProfileWrapper>
                <Image alt="icon-profile" src="/images/icon-profile.svg" width="50px" height="50px"/>
                <S.CameraIconWraper>
                <Image alt="icon-camera" src="/images/icon-camera.svg" width="50px" height="50px"/>
                </S.CameraIconWraper>
            </S.ProfileWrapper>
            <S.UserInfoInputWrapper>
                <S.UserInfoInputInner>
                    <S.InfoLabel>이메일</S.InfoLabel>
                    <S.UserInfoInput />
                </S.UserInfoInputInner>
                <S.UserInfoInputInner>
                    <S.InfoLabel>이메일</S.InfoLabel>
                    <S.UserInfoInput />
                </S.UserInfoInputInner>
            </S.UserInfoInputWrapper>
            <Button sort='setUserProfile' name= '관심분야 설정하러가기' />
            <S.SkipButton>다음에 하기</S.SkipButton>
        </S.Wrapper>
    )
}

export default SetUserProfile;