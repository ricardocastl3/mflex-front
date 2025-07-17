import { IPlan } from "../IPlan";
import { IResourceComment } from "../resources/IResourceComment";
import { IResourceLike } from "../resources/IResourceLike";
import { IResourceView } from "../resources/IResourceView";
import { IResourseShare } from "../resources/IResourseShare";

export interface ITVChannel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  available: boolean;
  is_public: boolean;
  is_live: boolean;
  st: number;
  comments: IResourceComment[];
  views: IResourceView[];
  likes: IResourceLike[];
  shares: IResourseShare[];

  description?: string;
  created_at: Date;
}

export interface ITVCategoryChannelsAPI {
  id: string;
  name: string;
  tv_channels: ITVChannel[];
}

// SAFED TO FRONT
export interface ITVCategorySafed {
  id: string;
  name: string;
  tv: ITVChannelSafed[];
}

export interface ITVChannelSafed {
  id: string;
  name: string;
  logo?: string;
  st: number;
  me: boolean;
  views: IResourceView[];
  is_live: boolean;
  public: boolean;
}
