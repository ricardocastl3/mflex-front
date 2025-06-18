import { IUserResponse } from "../../responses/IUserResponse";
import { IMusic } from "./IMusic";
import { IMusicDonation } from "./IMusicDonation";

export interface IArtistProfile {
  id: string;
  name: string;
  biography?: string;
  photo: string;
  is_online: boolean;
  is_verified: boolean;
  is_official: boolean;
  request_profile: boolean;

  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;

  user?: IUserResponse;
  musics: IMusic[];
  music_donations?: IMusicDonation[];
}
