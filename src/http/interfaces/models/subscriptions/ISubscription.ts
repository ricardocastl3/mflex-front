import { IPlan } from "../IPlan";
import { ISubscriptionUsage } from "./ISubscriptionUsage";

export interface ISubscription {
  id: string;
  plan?: IPlan;

  subscription_usage: ISubscriptionUsage;
  is_expired: boolean;
  expires_at: Date;
  created_at: Date;
}
