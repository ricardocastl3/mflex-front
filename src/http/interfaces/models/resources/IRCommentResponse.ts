import { IUserResponse } from "../../responses/IUserResponse";
import { IResourceComment } from "./IResourceComment";
import { IResourceLike } from "./IResourceLike";

export interface IRCommentResponse {
  id: string;
  user: IUserResponse;
  content: string;
  comment?: IResourceComment;
  created_at: Date;
  updated_at: Date;
  likes: IResourceLike[];
}
