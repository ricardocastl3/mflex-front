import { IArtistProfile } from "../models/artists/IArtistProfile";
import { ICreator } from "../models/fhouse/ICreator";
import { ICreatorFollowing } from "../models/fhouse/ICreatorFollowing";
import { IFinance } from "../models/IFinance";
import { IPayment } from "../models/IPayment";
import { IProfile } from "../models/IProfile";
import { ISettings } from "../models/ISettings";
import { ITransfer } from "../models/ITransfer";
import { IUser } from "../models/IUser";
import { ITicket } from "../models/organizer/ITicket";

export interface IUserResponse extends IUser {
  profile?: IProfile;
  settings: ISettings;
  financial: IFinance[];
  payments: IPayment[];
  transaferences: ITransfer[];
  tickets: ITicket[];
  creator?: ICreator;
  following: ICreatorFollowing[];
  artist_profile?: IArtistProfile;
}
