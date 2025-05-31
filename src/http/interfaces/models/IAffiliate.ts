import { IUserResponse } from "../responses/IUserResponse";
import { IEvent } from "./IEvent";

export interface IAffiliate {
  affiliate?: IUserResponse;
  event?: IEvent;
}
