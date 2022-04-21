import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { userRegisterInfoState } from '../recoil/auth';
import type { UserRegisterInfoType } from '../recoil/auth';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isSkip, setIsSkip] = useState<boolean>(false);

    const setUserInfo = useSetRecoilState<UserRegisterInfoType>(userRegisterInfoState);

    const navigateToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setIsNext(true);
    

    const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

    const initializeForm = () => {
        const initialedForm = { userProfile: null, email: "", nickname: "", description: "", mainCategory: [] };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setUserInfo(userInfo => userInfo = initialedForm)
    }

    const setModalVisible = () => {
        setIsShowing(!isShowing);
        initializeForm();
    }

    return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
}

export default useModal;