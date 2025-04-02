import { IPlan } from "./IPlan";
import { IUser } from "./IUser";

export interface ISubscription {
  code?: string;
  status?: string;
  monthly: boolean;
  user: IUser;
  plan: IPlan;
  created_at: Date;
  expires_at: Date;
}

export interface ISubscriptionResponse extends ISubscription {
  created_at: Date;
  expires_at: Date;
}
