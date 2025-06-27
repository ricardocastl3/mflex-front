import { IUserResponse } from "../../responses/IUserResponse";
import { ICreator } from "./ICreator";

export interface ICreatorFollowing {
  id: string;
  creator_id?: string;
  follower_id?: string;
  creator?: ICreator;
  follower?: IUserResponse;
  created_at: Date;
  updated_at: Date;
}
