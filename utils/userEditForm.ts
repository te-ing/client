import { User, UserEditForm } from 'types/user';

export const userEditForm = (user: User): UserEditForm => {
  return {
    nickname: user.nickname,
    description: user.description,
    profileImage: user.profileImage,
    backgroundImage: user.backgroundImage,
    categories: user.categories.map((category) => category.id).join(','),
  };
};
