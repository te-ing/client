import { useState } from 'react';
import { useRouter } from 'next/router';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isSkip, setIsSkip] = useState(false);

  const navigateToNext = () => {
    setIsNext(true);
  };

  const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

  const setModalVisible = () => {
    setIsShowing(!isShowing);
  };

  return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
};

export default useModal;
