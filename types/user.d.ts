export interface User {
  id: number;
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
