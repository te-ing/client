export interface PostTypes {
  count: number;
  next: number | null;
  previous: number | null;
  results: {
    id: number;
    images: { image: string }[];
    title: string;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
  }[];
}
