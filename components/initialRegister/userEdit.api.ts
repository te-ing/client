import usersApi from 'apis/users.api';
import { UserEditForm } from 'types/user';

export const editUserData = async (userData: UserEditForm) => {
  if (!userData) return false;
  const userId = sessionStorage.getItem('id');
  if (!userData?.nickname) {
    const userInfoData = await usersApi.getUserInfo(Number(userId));
    userData.nickname = userInfoData.nickname;
  }

  const body = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`,
    },
    nickname: userData.nickname,
    description: userData.description,
    profileImage: userData?.profileImage,
    backgroundImage: userData?.backgroundImage,
    categories: userData?.categories,
  };
  const config = { isRequiredLogin: true };
  const result = await usersApi.editUser(userId, body, config);
  return result;
};

export default editUserData;
