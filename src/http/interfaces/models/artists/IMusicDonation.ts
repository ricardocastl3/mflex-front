import { IUserResponse } from "../../responses/IUserResponse";
import { ITransfer } from "../ITransfer";
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
  music_title: string;
  
  artist_name: string;
  artist_number: string;

  customer_name?: string;
  customer_number?: string;
  customer_id?: string;
  customer?: IUserResponse;
  transferences?: ITransfer;
  music_id?: string;
  music?: IMusic;
}

export interface IMusicDonationResponseAPI {
  dash?: {
    gain: number;
    failed: number;
    success: number;
    pending: number;
  };
  total: number;
  has: boolean;
  donations: IMusicDonation[];
}
