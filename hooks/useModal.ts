import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const setModalVisible = () => {
        setIsShowing(!isShowing);
    }

    return { isShowing, setModalVisible };
}

export default useModal;