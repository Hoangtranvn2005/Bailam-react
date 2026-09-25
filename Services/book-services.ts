export interface Book {
  id: number;
  title: string;
  author?: string;
  category?: string;
  description?: string;
  coverColor?: string;
  image?: string;
}

export const API_URL = "http://127.0.0.1:8000/api";