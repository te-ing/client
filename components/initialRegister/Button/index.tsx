import usersApi from 'apis/users.api';
import React from 'react';
import { UserEditForm } from 'types/user';
import * as S from './styles';

export interface ButtonPropsType {
  sort: string;
  name?: string;
  navigateToNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  userData?: UserEditForm;
  disabled?: boolean;
}

const Button: React.FC<ButtonPropsType> = ({ sort, name, navigateToNext, userData, disabled = false }) => {
  const editUserData = async (userData: UserEditForm) => {
    if (!userData) return;
    const userId = sessionStorage.getItem('id');
    if (!userData?.email) {
      const userInfoData = await usersApi.getUserInfo(Number(userId));
      userData.email = userInfoData.email;
      userData.nickname = userInfoData.nickname;
    }

    const body = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`,
      },
      email: userData.email,
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

  return (
    <S.StyledButton
      sort={sort}
      name={name}
      onClick={(e) => {
        navigateToNext(e);
        editUserData(userData);
      }}
      disabled={disabled}
    >
      {name}
    </S.StyledButton>
  );
};

export default Button;
