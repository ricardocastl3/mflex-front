import { IUserResponse } from "../../responses/IUserResponse";
import { ICreatorFollowing } from "./ICreatorFollowing";

export interface ICreator {
  id: string;
  user_id?: string;
  is_active: boolean;
  cover: string;
  biography: string;
  username: string;
  monetized: boolean;
  created_at: Date;
  updated_at: Date;
  user: IUserResponse;
  followers: ICreatorFollowing[];
}
