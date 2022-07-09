import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as S from './SetUserProfile.style';
import usersApi from 'apis/users.api';

import SetUserInterest from '../SetUserInterest';

import useModal from 'hooks/useModal';
import useDebounce from 'hooks/useDebounce';
import { useUploadImage } from 'hooks/useUploadImage';
import editUserData from '../userEdit.api';

interface checkUserNameResult {
  message?: string;
}

const SetUserProfile: React.FC = () => {
  const { skip, isSkip } = useModal();
  const [imgUrl, setImgUrl, storeImage] = useUploadImage('');
  const [nickname, setNickname] = useState('');
  const [isNicknameLoading, setIsNicknameLoading] = useState(true);
  const [isNicknameUnique, setisNicknameUnique] = useState(false);
  const userData = { nickname, profileImage: imgUrl };
  const debounceNickname = useDebounce({ value: nickname });

  const handleChangeProfileFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    storeImage(e);
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

  const confirmSetting = () => {
    skip();
    editUserData(userData);
  };

  if (isSkip) return <SetUserInterest />;
  else
    return (
      <S.Wrapper>
        <S.InfoHeader>
          <S.Title>프로필을 설정 해주세요</S.Title>
          <S.SubInfo>
            다양한 작품, 작업물을 올리기 전에 <br /> 나의 관심사를 설정해 두면 도움이 됩니다.
          </S.SubInfo>
        </S.InfoHeader>
        <S.ProfileWrapper>
          <S.ProfileLabel htmlFor="file-input">
            <S.ProfileIcon
              alt="icon-profile"
              src={`${imgUrl ? imgUrl : '/images/icon-profile.svg'}`}
              width="120px"
              height="120px"
            />
            <S.FileInput id="file-input" type="file" name="file-input" onChange={handleChangeProfileFile} />
            <S.CameraIconWraper>
              <Image alt="icon-camera" src="/images/icon-camera.svg" width="30px" height="29px" />
            </S.CameraIconWraper>
          </S.ProfileLabel>
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
        <S.Button disabled={!isNicknameUnique} onClick={confirmSetting}>
          관심분야 설정하러가기
        </S.Button>
      </S.Wrapper>
    );
};

export default SetUserProfile;
