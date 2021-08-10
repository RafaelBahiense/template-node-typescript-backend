export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthUser {
  userId: number;
  name: string;
  token: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  hash: string;
}
