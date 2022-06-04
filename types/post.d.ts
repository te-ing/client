export interface PostTypes {
  count: number;
  next: number | null;
  previous: number | null;
  results: PostType[];
}

export interface PostType {
  id: number;
  images: { image: string }[];
  title: string;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  author: number;
  commentCount: number;
}

export interface UploadType {
  title: string;
  description: string;
  images: string[];
}
