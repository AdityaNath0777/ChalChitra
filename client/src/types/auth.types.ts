export type LoginInfo = {
  email: string;
  password: string;
};

export type UpdateUserInfo = {
  email?: string;
  fullName?: string;
};

export type RegisterInfo = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  avatar: File;
  coverImage?: File;
};