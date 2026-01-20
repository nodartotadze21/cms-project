export interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: string;
  published: boolean;
  createdAt: string;
}

export interface FormData {
  title: string;
  content: string;
  image: string;
  date: string;
}

export interface StorageAPI {
  get(key: string): Promise<{ value: string } | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
