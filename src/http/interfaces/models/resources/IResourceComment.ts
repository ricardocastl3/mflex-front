import { IUserResponse } from "../../responses/IUserResponse";
import { IMusic } from "../artists/IMusic";
import { INews } from "../INews";
import { IPodcast } from "../IPodCast";
import { ITVChannel } from "../tv/ITVChannel";
import { ITVMovie } from "../tv/ITVMovie";
import { IRCommentResponse } from "./IRCommentResponse";
import { IResourceLike } from "./IResourceLike";

export interface IResourceComment {
  id: string;
  user: IUserResponse;
  news?: INews;
  music?: IMusic;
  tv_movie?: ITVMovie;
  tv_channel?: ITVChannel;
  podcast?: IPodcast;
  created_at: Date;
  content: string;
  responses: IRCommentResponse[];
  likes: IResourceLike[];
}
