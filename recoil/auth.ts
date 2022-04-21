import { atom } from 'recoil';

export interface UserCategoryType {
    mainCategory: number;
    subCategory: number[];
}

export interface UserRegisterInfoType {
    userProfile: string | ArrayBuffer | null;
    email: string;
    nickname: string;
    description: string;
    mainCategory: UserCategoryType[]
}

export const userRegisterInfoState = atom<UserRegisterInfoType>({
    key: 'userRegisterInfoState',
    default: {
        userProfile: "",
        email: "",
        nickname: "",
        description: "",
        mainCategory: []
    }
})