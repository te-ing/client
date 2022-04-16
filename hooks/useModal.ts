import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);
    
    const [isNext, setIsNext] = useState<boolean>(false);
    const [isSkip, setIsSkip] = useState<boolean>(false);

    const navigateToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setIsNext(true);
    

    const skip = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setIsSkip(true);

    const setModalVisible = () => {
        setIsShowing(!isShowing);
    }

    return { isShowing, setModalVisible, isNext, navigateToNext, isSkip, skip };
}

export default useModal;