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
  mainCategory: UserCategoryType[];
}

export interface socialLoginState {
  accessToken: string;
  id: number;
  message: string;
  nickname: string;
  socialType: string;
}

export const userRegisterInfoState = atom<UserRegisterInfoType>({
  key: 'userRegisterInfoState',
  default: {
    userProfile: null,
    email: '',
    nickname: '',
    description: '',
    mainCategory: [],
  },
});

export const socialLoginState = atom<socialLoginState>({
  key: 'socialLoginState',
  default: {
    accessToken: '',
    id: 0,
    message: '',
    nickname: '',
    socialType: '',
  },
});

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
