export interface PostTypes {
  count: number;
  next: number | null;
  previous: number | null;
  results: PostType[];
}

export interface PostType {
  id: number;
  author: number;
  description: string;
  images: { image: string }[];
  title: string;
  createdAt: string;
  updatedAt: string;
  author: number;
  likeCount: number;
  commentCount: number;
  isLike: boolean;
  isScrap: boolean;
}

export interface UploadType {
  title: string;
  description: string;
  images?: string[];
}
