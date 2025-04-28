export interface Author {
  name: string;
  image: string;
  bio: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readingTime: number;
  categories: string[];
  commentCount: number;
  author: Author;
}