import { IUserResponse } from "../../responses/IUserResponse";
import { ISubscription } from "./ISubscription";

export interface ISubscriptionUsage {
  id: string;
  subscription: ISubscription;
  subscription_id: string;
  football_ai?: number;
  user: IUserResponse;
  user_id: string;
}
