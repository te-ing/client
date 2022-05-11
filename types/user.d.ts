export interface User {
  id: string;
  email: string;
  nickname: string;
  description: string;
  profileImage: string;
  backgroundImage: string;
  categories: { id: number; name: string }[];
  postCount: number;
  scrapCount: number;
  followerCount: number;
  followingCount: number;
}

export interface UserEditForm {
  email: string;
  nickname: string;
  description: string;
  profileImage: string;
  backgroundImage: string;
  categories: string;
}
