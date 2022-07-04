export interface PostTypes {
  count: number;
  next: number | null;
  previous: number | null;
  results: PostType[];
}

export interface PostType {
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
  team?: number;
}

export interface MainPostType {
  userPost: PostType[];
  teamPost: PostType[];
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
