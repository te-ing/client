type CategoryType = { id: number; name: sring };

export interface User {
  id: number;
  email: string;
  nickname: string;
  description: string;
  profileImage: string;
  backgroundImage: string;
  categories: CategoryType[];
  postCount: number;
  scrapCount: number;
  followerCount: number;
  followingCount: number;
}

export interface UserEditForm {
  email: string;
  nickname: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  categories?: string;
}
