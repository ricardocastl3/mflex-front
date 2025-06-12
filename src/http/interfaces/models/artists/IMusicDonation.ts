import { IUserResponse } from "../../panel-users/users/IUserResponse";
import { ITransference } from "../../panel-payments/transfer/ITransference";
import { IIAngolanReference } from "../../panel-payments/angolan-reference/IAngolanReference";
import { IMusic } from "../musics/IMusic";
import { IArtistProfile } from "../artist_profile/IArtistProfile";

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

  transferences?: ITransference;
  angolan_references?: IIAngolanReference;
}
