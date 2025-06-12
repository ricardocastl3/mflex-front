import { IUserResponse } from "../../responses/IUserResponse";
import { IArtistProfile } from "./IArtistProfile";
import { IMusic } from "./IMusic";

export interface IMusicDonation {
  id: string;
  amount: number;
  status: string;
  payment_method: string;
  out_trade_no?: string;

  artist_profile_id: string;
  artist_profile?: IArtistProfile;

  customer_name?: string;
  customer_number?: string;
  customer_id?: string;
  customer?: IUserResponse;

  music_id?: string;
  music?: IMusic;
}
