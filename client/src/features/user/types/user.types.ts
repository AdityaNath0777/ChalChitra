export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage: string;
  watchHistory?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserProps {
  email?: string;
  fullName?: string;
  username?: string;
  avatar?: File | null;
  coverImage?: File | null;
}
