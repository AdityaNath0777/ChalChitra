// import { Owner } from "@features/user/types/user.types";

interface VideoOwner {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage: string;
  watchHistory?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  isPublished: true;
  owner:VideoOwner;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
