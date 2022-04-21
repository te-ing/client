import { useState } from 'react';

import { useResetRecoilState } from 'recoil';
import { userRegisterInfoState } from '../recoil/auth';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isSkip, setIsSkip] = useState<boolean>(false);

    const resetUserInfo = useResetRecoilState(userRegisterInfoState);

    const navigateToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setIsNext(true);
    

    const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

    const initializeForm = () => {
        resetUserInfo();
    }

    const setModalVisible = () => {
        setIsShowing(!isShowing);
        initializeForm();
    }

    return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
}

export default useModal;