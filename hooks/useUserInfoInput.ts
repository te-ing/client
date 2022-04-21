import React, { useState, useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userRegisterInfoState } from '../recoil/auth';
import type { UserRegisterInfoType } from '../recoil/auth';

import { useQuery } from 'react-query';

import UsersAPI from 'pages/api/users.api';
import * as R from '../constants/regExp';
import { handleEncode } from 'utils/handleEncode';

const useUserInfoInput = () => {
    const [userInfo, setUserInfo] = useRecoilState<UserRegisterInfoType>(userRegisterInfoState);
    const { email, nickname } = useRecoilValue<UserRegisterInfoType>(userRegisterInfoState);

    const [isEmailCorrect, setEmailCorrect] = useState(false);
    
    const { status } = useQuery(["checkUser", nickname], () => { 
        const encodedNickname = handleEncode(nickname);
        const params = { nickname: encodedNickname };
        UsersAPI.checkUserName(params);
     }, {
        enabled: nickname.length !== 0
    });

    const handleUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
        const currentInputName = (e.target as unknown as HTMLInputElement).id;
        const currentInputValue = (e.target as unknown as HTMLInputElement).value;
    
        const updatedUserInfo = { ...userInfo, [currentInputName]: currentInputValue };
        
        setUserInfo(updatedUserInfo);
    };

    useEffect(() => {
        if(email.match(R.email)) setEmailCorrect(true);
        else setEmailCorrect(false);
    }, [email]);
    
    return { email, nickname, isEmailCorrect, status, handleUserInfo };
}

export default useUserInfoInput;