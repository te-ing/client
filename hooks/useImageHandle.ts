import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { userRegisterInfoState } from '../recoil/auth';

import { readFile } from '../utils/readFile';

const useImageHandle = () => {
    const [userInfo, setUserInfo] = useRecoilState(userRegisterInfoState);

    const storeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentFile = (e.target as HTMLInputElement).files[0];
        const readedFile = currentFile && await readFile(currentFile);


    }
}

export default useImageHandle;