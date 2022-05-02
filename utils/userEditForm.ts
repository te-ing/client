import { User, UserEditForm } from 'types/user';

export const userEditForm = (user: User): UserEditForm => {
  console.log('user', user);
  return {
    email: user.email,
    nickname: user.nickname,
    description: user.description,
    profileImage: user.profileImage,
    backgroundImage: user.backgroundImage,
    categories: user.categories.map((category) => category.id).join(','),
  };
};
