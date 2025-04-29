export interface Author {
  name: string;
  image: string;
}

export interface BlogPost {
  id: string;
  slug: string; // Add slug
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string; // Keep single category for now based on admin input
  categories: string[]; // Add categories array for compatibility with existing data
  author: Author; // Use Author interface
  authorName: string; // Keep for compatibility if needed elsewhere
  authorImage: string; // Keep for compatibility if needed elsewhere
  date: string;
  readingTime: string; // Add readingTime
}
