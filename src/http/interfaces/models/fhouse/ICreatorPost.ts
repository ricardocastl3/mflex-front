import { IResourceComment } from "../resources/IResourceComment";
import { IResourceLike } from "../resources/IResourceLike";
import { IResourceView } from "../resources/IResourceView";
import { IResourseShare } from "../resources/IResourseShare";
import { ICreator } from "./ICreator";

export interface ICreatorPost {
  id: string;
  title: string;
  description: string;
  reel_url?: string;
  image?: string;
  type: string;
  visibility: string;
  author_id?: string;
  created_at: Date;
  updated_at: Date;

  shares: IResourseShare[];
  views: IResourceView[];
  comments: IResourceComment[];
  likes: IResourceLike[];
  author?: ICreator;
}

export interface ICreatorPostAPI {
  total: number;
  has: boolean;
  posts: ICreatorPost[];
}
