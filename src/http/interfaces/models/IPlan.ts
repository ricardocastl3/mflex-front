import { ISubscription } from "./ISubscription";

export interface IPlan {
  id: string;
  name: string;
  links: number;
  price_id: string;
  ao_amount: number;
  us_amount: number;
  is_trial: boolean;
}

export interface IPlanResponse extends IPlan {
  subscriptions: ISubscription[];
}
