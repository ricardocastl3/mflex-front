import { IArtistProfile } from "../models/artists/IArtistProfile";
import { IFinance } from "../models/IFinance";
import { IPayment } from "../models/IPayment";
import { IProfile } from "../models/IProfile";
import { ISettings } from "../models/ISettings";
import { ITicket } from "../models/ITicket";
import { ITransfer } from "../models/ITransfer";
import { IUser } from "../models/IUser";

export interface IUserResponse extends IUser {
  profile?: IProfile;
  settings: ISettings;
  financial: IFinance[];
  payments: IPayment[];
  transaferences: ITransfer[];
  tickets: ITicket[];
  artist_profile?: IArtistProfile;
}
