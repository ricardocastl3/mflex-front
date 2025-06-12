import { IUserResponse } from "../responses/IUserResponse";
import { IMusicDonation } from "./artists/IMusicDonation";
import { IPayment } from "./IPayment";

export interface ITransfer {
  id: string;
  iban?: string;
  status: string;
  organizer?: IUserResponse;
  payment: IPayment;
  music_donation?: IMusicDonation;
}
