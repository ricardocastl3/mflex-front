import { IUserResponse } from "../../responses/IUserResponse";
import { ISubscription } from "../subscriptions/ISubscription";

export interface IMusicSubscription {
  id: string;
  musics: number;
  user_id: string;
  user?: IUserResponse;
  subscription_id: string;
  subscription: ISubscription;
}
