import { ISubscription } from "./ISubscription";

export interface ISubscriptionUsage {
  id: string;
  subscription: ISubscription;
  football_ai?: number;
}
