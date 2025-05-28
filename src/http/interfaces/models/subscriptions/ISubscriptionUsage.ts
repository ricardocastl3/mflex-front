import { ISubscription } from "./ISubscription";

export interface ISubscriptionUsage {
  id: string;
  subscription: ISubscription;
  tickets_amount?: number;
  football_ai?: number;
}
