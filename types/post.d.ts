type author = {
  id: number;
  nickname: string;
  profileImage: string;
};

type team = {
  id: number;
  title: string;
  teamProfileImage: string;
};

export interface PostTypes {
  count: number;
  next: number | null;
  previous: number | null;
  results: PostType[];
}

export interface PostType {
  team?: number;
  id: number;
  author?: number;
  description: string;
  images: { image: string }[];
  title: string;
  createdAt: string;
  updatedAt: string;
  author: number;
  likeCount: number;
  scrapCount: number;
  commentCount: number;
  isLike: boolean;
  isScrap: boolean;
}

export interface PostCardType {
  id: number;
  author?: author;
  team?: team;
  description: string;
  images: { image: string }[];
  title: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  scrapCount: number;
  commentCount: number;
  isLike: boolean;
  isScrap: boolean;
}

export interface MainPostType {
  userPost: PostCardType[];
  teamPost: PostCardType[];
}

export interface UploadType {
  title: string;
  description: string;
  images?: string[];
}

export interface TeamPostType {
  id: number;
  team: number;
  title: string;
  description: string;
  images: { image: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamUploadType {
  team: number;
  title: string;
  description: string;
  images?: string[];
}
