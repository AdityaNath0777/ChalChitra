import { Owner } from "@features/user/types/user.types";

export interface Comment {
  content: string;
  video: string;
  owner: Owner;
}