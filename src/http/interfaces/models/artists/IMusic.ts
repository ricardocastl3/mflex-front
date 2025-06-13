import { ICategory } from "../ICategory";
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

  is_online: boolean;
  is_public: boolean;
  created_at: Date;

  duration: string;
  views: number;
  category: ICategory;
  artist_profile?: IArtistProfile;
  music_donations?: IMusicDonation[];
  views_count: IMusicView[];
}

export interface IMusicResponseAPI {
  total: number;
  has: boolean;
  musics: IMusic[];
}
