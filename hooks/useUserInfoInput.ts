import React, { useState, useEffect, useCallback } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userRegisterInfoState } from '../recoil/auth';
import type { UserRegisterInfoType } from '../recoil/auth';

import { useQuery } from 'react-query';

import * as usersAPI from '../api/users.api';
import * as R from '../constants/regExp';

const useUserInfoInput = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserRegisterInfoType>(userRegisterInfoState);
  const { email, nickname } = useRecoilValue<UserRegisterInfoType>(userRegisterInfoState);

  const [isEmailCorrect, setEmailCorrect] = useState(false);

  const { status } = useQuery(['checkUser', nickname], () => usersAPI.checkUserNickName(nickname), {
    enabled: nickname.length !== 0,
  });

  const handleUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
    const currentInputName = (e.target as unknown as HTMLInputElement).id;
    const currentInputValue = (e.target as unknown as HTMLInputElement).value;

    const updatedUserInfo = { ...userInfo, [currentInputName]: currentInputValue };

    setUserInfo(updatedUserInfo);
  };

  useEffect(() => {
    if (email.match(R.email)) setEmailCorrect(true);
    else setEmailCorrect(false);
  }, [email]);

  return { email, nickname, isEmailCorrect, status, handleUserInfo };
};

export default useUserInfoInput;
