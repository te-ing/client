import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState<boolean>(true);

    const setModalVisible = () => {
        setIsShowing(!isShowing);
    }

    return { isShowing, setModalVisible };
}

export default useModal;