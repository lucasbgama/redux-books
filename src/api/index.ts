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

export const API_URL = "https://books.ioasys.com.br/api/v1/";
