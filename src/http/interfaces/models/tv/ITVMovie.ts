import { ICategory } from "../ICategory";
import { IPlan } from "../IPlan";

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
}

export interface ITVMovieChannelsAPI {
  me: {
    id: string;
    name: string;
    tv_movies: ITVMovie[];
  }[];
  others: {
    id: string;
    name: string;
    tv_movies: ITVMovie[];
  }[];
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
  public: boolean;
  is_live: boolean;
  plan: IPlan;
}
