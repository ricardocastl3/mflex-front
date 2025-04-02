import { IFinance } from "../models/IFinance";
import { IPayment } from "../models/IPayment";
import { IProduct } from "../models/IProduct";
import { IProfile } from "../models/IProfile";
import { ISettings } from "../models/ISettings";
import { ISubscription } from "../models/ISubscription";
import { ITransfer } from "../models/ITransfer";
import { IUser } from "../models/IUser";

export interface IUserResponse extends IUser {
  profile?: IProfile;
  settings: ISettings;
  financial: IFinance[];
  payments: IPayment[];
  products: IProduct[];
  transaferences: ITransfer[];
  subscriptions: ISubscription[];
}
