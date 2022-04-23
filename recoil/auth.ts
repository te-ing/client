import { atom } from 'recoil';

export interface UserCategoryInfoType {
    mainCategory: string;
    subcategory: number[];
}

export interface UserRegisterInfoType {
    userProfile: string | ArrayBuffer | null;
    email: string;
    nickname: string;
    description: string;
    mainCategory: UserCategoryInfoType[]
}

export const userRegisterInfoState = atom<UserRegisterInfoType>({
    key: 'userRegisterInfoState',
    default: {
        userProfile: null,
        email: "",
        nickname: "",
        description: "",
        mainCategory: []
    }
})

// export const getDuplicateNickNameInfo = selector({
//     key: "get/duplicateNicknameInfo",
//     get: ({ get }) => {
//         const { nickname } = get(userRegisterInfoState);
        
//         return nickname;
//         const empty = nickname.length === 0;
//         if(nickname.length === 0) return;

//         try {
//             const data = await checkUserNickName(nickname);
//             return data;
//         } catch(e) {
//             throw Error('error');
//         }
//     }
// })