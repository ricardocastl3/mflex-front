import { ICategory } from "../ICategory";
import { IResourceComment } from "../resources/IResourceComment";
import { IResourceLike } from "../resources/IResourceLike";
import { IResourseShare } from "../resources/IResourseShare";
import { IArtistProfile } from "./IArtistProfile";
import { IMusicDonation } from "./IMusicDonation";
import { IMusicView } from "./IMusicView";

export interface IMusic {
  id: string;
  title: string;
  cover: string;
  description: string;
  url: string;
  slug: string;
  is_donable: boolean;

  is_online: boolean;
  is_public: boolean;
  created_at: Date;

  duration: string;
  views: number;
  category: ICategory;
  artist_profile?: IArtistProfile;
  music_donations?: IMusicDonation[];
  views_count: IMusicView[];

  comments: IResourceComment[];
  likes: IResourceLike[];
  shares: IResourseShare[];
}

export interface IMusicResponseAPI {
  total: number;
  has: boolean;
  musics: IMusic[];
}
