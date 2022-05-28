import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userRegisterInfoState } from 'recoil/auth';
import { useQuery } from 'react-query';
import UsersAPI from 'apis/users.api';
import { useRouter } from 'next/router';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const userInfo = useRecoilValue(userRegisterInfoState);
  const route = useRouter();

  const { data } = useQuery(
    ['registerUser', userInfo],
    () => {
      UsersAPI.registerUser(userInfo);
    },
    {
      enabled: false,
    }
  );

  const navigateToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentModalButton = (e.target as HTMLButtonElement).name;
    if (currentModalButton === '프로필 설정하기') {
      setModalVisible();
      route.push('/');
    } else setIsNext(true);
  };

  const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

  const setModalVisible = () => {
    setIsShowing(!isShowing);
  };

  return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
};

export default useModal;
