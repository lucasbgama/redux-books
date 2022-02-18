export interface User {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  gender: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  authors: string[];
  pageCount: string;
  category: string;
  imageUrl: string;
  isbn10: string;
  isbn13: string;
  language: string;
  publisher: string;
  published: number;
}

export const API_URL = "https://books.ioasys.com.br/api/v1/";
