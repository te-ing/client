import usersApi from 'apis/users.api';
import { atom, selector, selectorFamily } from 'recoil';
import { User } from 'types/user';

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

export const userInfoState = atom<User>({
  key: 'userInfo',
  default: {
    id: 0,
    email: '',
    nickname: '',
    description: '',
    profileImage: '',
    backgroundImage: '',
    categories: [],
    postCount: 0,
    scrapCount: 0,
    followerCount: 0,
    followingCount: 0,
    isFollowed: false,
  },
});

export const getUserInfoState = selectorFamily({
  key: 'userInfo/get',
  get: (userId: User['id']) => async () => {
    if (!userId) return '';

    const response = await usersApi.getUserInfo(userId);
    return response;
  },
});

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
