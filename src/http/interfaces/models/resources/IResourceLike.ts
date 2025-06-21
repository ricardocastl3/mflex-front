import { IUserResponse } from "../../responses/IUserResponse";
import { IMusic } from "../artists/IMusic";
import { INews } from "../INews";
import { IPodcast } from "../IPodCast";
import { IEvent } from "../organizer/IEvent";
import { ITVChannel } from "../tv/ITVChannel";
import { ITVMovie } from "../tv/ITVMovie";
import { IRCommentResponse } from "./IRCommentResponse";
import { IResourceComment } from "./IResourceComment";

export interface IResourceLike {
  id: string;
  user: IUserResponse;
  news?: INews;
  music?: IMusic;
  tv_movie?: ITVMovie;
  tv_channel?: ITVChannel;
  podcast?: IPodcast;
  event?: IEvent;
  res_comment?: IRCommentResponse;
  comment?: IResourceComment;
  created_at: Date;
}
