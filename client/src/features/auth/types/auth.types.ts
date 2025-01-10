export type LoginProps = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UpdateUserInfo = {
  email?: string;
  fullName?: string;
  username?: string;
  avatar?: File | null;
  coverImage?: File | null;
};

export type RegisterUserProps = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: File | null;
  coverImage?: File | null;
};