import { ICategory } from "../ICategory";
import { IPlan } from "../IPlan";
import { IResourceComment } from "../resources/IResourceComment";
import { IResourceLike } from "../resources/IResourceLike";
import { IResourceView } from "../resources/IResourceView";
import { IResourseShare } from "../resources/IResourseShare";

export interface ITVMovie {
  id: string;
  name: string;
  thumbnail: string;
  st: number;
  is_adult: number;
  is_live: boolean;
  is_public: boolean;
  available: boolean;
  url: string;
  rating: string;
  wrapper: string;
  category: ICategory;
  category_id: string;
  plan: IPlan;
  plan_id: string;

  comments: IResourceComment[];
  views: IResourceView[];
  likes: IResourceLike[];
  shares: IResourseShare[];

  created_at: Date;
}

export interface ITVMovieChannelsAPI {
  id: string;
  name: string;
  tv_movies: ITVMovie[];
}

// SAFED TO FRONT
export interface ITVCategoryMovieSafed {
  id: string;
  name: string;
  tv: ITVMovieSafed[];
}

export interface ITVMovieSafed {
  id: string;
  name: string;
  logo?: string;
  st: number;
  me: boolean;
  rating: string;
  public: boolean;
  is_live: boolean;
  views: IResourceView[];
}
