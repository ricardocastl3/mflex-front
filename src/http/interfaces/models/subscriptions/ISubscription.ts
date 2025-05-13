import { IPlan } from "../IPlan";
import { ISubscriptionUsage } from "./ISubscriptionUsage";
import { IUser } from "../IUser";

export interface ISubscription {
  id: string;
  plan?: IPlan;
  plan_id?: string;
  user: IUser;
  user_id: string;
  subscription_usage: ISubscriptionUsage;
  is_expired: boolean;
  expires_at: Date;
  created_at: Date;
}
