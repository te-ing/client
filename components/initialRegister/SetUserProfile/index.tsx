import React, { useEffect, useState } from 'react';
import * as S from './SetUserProfile.style';

import SetUserInterest from '../SetUserInterest';
import CompleteRegister from '../CompleteRegister';

import ImageUploadWrapper from 'components/common/ImageUploadWrapper';
import Button from '../Button';

import useModal from 'hooks/useModal';
import Image from 'next/image';
import { handleEncode } from 'utils/handleEncode';
import usersApi from 'apis/users.api';
import useDebounce from 'hooks/useDebounce';

interface checkUserNameResult {
  message?: string;
}

const SetUserProfile: React.FC = () => {
  const { isNext, navigateToNext, isSkip, skip } = useModal();
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isNicknameLoading, setIsNicknameLoading] = useState(true);
  const [isNicknameUnique, setisNicknameUnique] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const userData = { nickname, profileImage };
  const debounceNickname = useDebounce({ value: nickname });

  const handleChangeProfileFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgFile(e.target.result);
    };
    setProfileImage(`https://dreamin-image.s3.ap-northeast-2.amazonaws.com/${handleEncode(file.name)}`);
  };

  const handleNicknameInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setisNicknameUnique(false);
    setIsNicknameLoading(true);
    setNickname(e.target.value);
  };

  useEffect(() => {
    const checkNickname = async () => {
      if (!nickname) return;
      const result: checkUserNameResult = await usersApi.checkUserName(nickname);
      if (result.message === 'check nickname ok') {
        setisNicknameUnique(true);
        setIsNicknameLoading(false);
      }
    };
    checkNickname();
  }, [debounceNickname]);

  if (isNext) return <SetUserInterest />;
  else if (isSkip) return <CompleteRegister />;
  else
    return (
      <S.Wrapper>
        <S.InfoHeader>
          <S.Title>프로필을 설정 해주세요</S.Title>
          <S.SubInfo>
            다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.
          </S.SubInfo>
        </S.InfoHeader>
        <S.ProfileWrapper onChange={handleChangeProfileFile}>
          <ImageUploadWrapper name="user">
            <S.ProfileIcon
              alt="icon-profile"
              src={`${imgFile ? imgFile : '/images/icon-profile.svg'}`}
              width="120px"
              height="120px"
            />
          </ImageUploadWrapper>
          <S.CameraIconWraper>
            <Image alt="icon-camera" src="/images/icon-camera.svg" width="30px" height="29px" />
          </S.CameraIconWraper>
        </S.ProfileWrapper>

        <S.UserInfoInputWrapper>
          <S.UserInfoInputInner>
            <S.InfoLabel htmlFor="nickname">닉네임</S.InfoLabel>
            <S.UserInfoInput id="nickname" placeholder="닉네임을 입력해 주세요." onChange={handleNicknameInputValue} />
            <S.Alert>
              {isNicknameLoading ? '' : isNicknameUnique ? '사용 가능한 닉네임 입니다.' : '중복되는 닉네임 입니다.'}
            </S.Alert>
          </S.UserInfoInputInner>
        </S.UserInfoInputWrapper>
        <Button
          sort="setUserProfile"
          name="관심분야 설정하러가기"
          userData={userData}
          navigateToNext={navigateToNext}
          disabled={!isNicknameUnique}
        />
      </S.Wrapper>
    );
};

export default SetUserProfile;
