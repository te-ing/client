import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';
import { useQuery } from 'react-query';
import UsersAPI from 'apis/users.api';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const userInfo = useRecoilValue(userRegisterInfoState);
  const resetUserInfo = useResetRecoilState(userRegisterInfoState);

  const { data } = useQuery(
    ['registerUser', userInfo],
    () => {
      UsersAPI.registerUser(userInfo);
    },
    {
      enabled: isComplete,
    }
  );

  const navigateToNext = () => {
    setIsNext(true);
  };

  const skip = () => {
    setIsSkip(true);
  };

  const initializeForm = () => {
    resetUserInfo();
  };

  const setModalVisible = () => {
    setIsShowing(!isShowing);
    initializeForm();
  };

  return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
};

export default useModal;
