import { Owner } from "@features/user/types/user.types";

export interface Tweet {
  content: string;
}

export interface UserTweet {
  content: string;
  owner: Owner;
}

export interface UpdateTweet {
  content: string;
  videoId: string;
}
