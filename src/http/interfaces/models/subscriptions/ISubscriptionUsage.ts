import { ISubscription } from "./ISubscription";

export interface ISubscriptionUsage {
  id: string;
  subscription: ISubscription;
  tickets_amount?: number;
  flex_movie?: boolean;
  flex_tv?: boolean;
  football_ai?: number;
}
