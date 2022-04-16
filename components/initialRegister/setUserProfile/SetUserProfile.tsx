import React from 'react';
import * as S from './SetUserProfile.style';

import SetUserInterest from '../setUserInterest/SetUserInterest';
import CompleteRegister from '../completeRegister/CompleteRegister';

import ImageUploadWrapper from '../../common/imageUploadWrapper/ImageUploadWrapper';
import Button from '../button/Button';

import useModal from '../../../hooks/useModal';

const SetUserProfile: React.FC = () => {
    const { isNext, navigateToNext, isSkip, skip } = useModal();
    

    if(isNext) return <SetUserInterest />
    else if(isSkip) return <CompleteRegister />
    else return (
        <S.Wrapper>
            <S.InfoHeader>
                <S.Title>프로필을 설정 해주세요</S.Title>
                <S.SubInfo>다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.</S.SubInfo>
            </S.InfoHeader>
            <S.ProfileWrapper>
                <ImageUploadWrapper>
                <S.ProfileIcon alt="icon-profile" src="/images/icon-profile.svg" width="120px" height="120px"/>
                </ImageUploadWrapper>
                <S.CameraIconWraper>
                <S.CameraIcon alt="icon-camera" src="/images/icon-camera.svg" width="28px" height="27px"/>
                </S.CameraIconWraper>
            </S.ProfileWrapper>
            <S.UserInfoInputWrapper>
                <S.UserInfoInputInner>
                    <S.InfoLabel htmlFor="email">이메일</S.InfoLabel>
                    <S.UserInfoInput id="email" placeholder="이메일을 입력해 주세요."/>
                </S.UserInfoInputInner>
                <S.UserInfoInputInner>
                    <S.InfoLabel htmlFor="nickname" >닉네임</S.InfoLabel>
                    <S.UserInfoInput id="nickname" placeholder="닉네임을 입력해 주세요."/>
                </S.UserInfoInputInner>
            </S.UserInfoInputWrapper>
            <Button sort='setUserProfile' name= '관심분야 설정하러가기' navigateToNext={navigateToNext}/>
            <S.SkipButton onClick={skip}>다음에 하기</S.SkipButton>
        </S.Wrapper>
    )
}

export default SetUserProfile;