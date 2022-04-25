import { useState } from 'react';

import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';

import { useQuery } from 'react-query';
import UsersAPI from 'pages/api/users.api';

const useModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const [isNext, setIsNext] = useState<boolean>(false);
  const [isSkip, setIsSkip] = useState<boolean>(false);
  const [isComplete, setComplete] = useState<boolean>(false);

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

  const navigateToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentModalButton = (e.target as HTMLButtonElement).name;
    if (currentModalButton === '프로필 설정하기') {
      setComplete(!isComplete);
      setModalVisible();
    } else setIsNext(true);
  };

  const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

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
