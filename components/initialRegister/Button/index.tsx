import React from 'react';
import * as S from './styles';
import { UserEditForm } from 'types/user';
import editUserData from '../userEdit.api';
import { useRouter } from 'next/router';

export interface ButtonPropsType {
  sort: string;
  name?: string;
  userData?: UserEditForm;
  navigateToNext?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonPropsType> = ({ sort, name, userData, navigateToNext, disabled = false }) => {
  const router = useRouter();
  const clickNextButton = () => {
    if (!userData) {
      router.push(`/user/${sessionStorage.getItem('id')}`);
    } else {
      editUserData(userData);
    }
  };

  return (
    <S.StyledButton
      sort={sort}
      name={name}
      userData={userData}
      onClick={(e) => {
        navigateToNext(e);
        clickNextButton();
      }}
      disabled={disabled}
    >
      {name}
    </S.StyledButton>
  );
};

export default Button;
