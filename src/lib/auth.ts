export const TOKEN_COOKIE = "admin-token";

export type AuthUser = {
  id: number;
  username: string;
  fullName: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};
