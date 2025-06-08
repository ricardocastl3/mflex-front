import { IUserResponse } from "../../responses/IUserResponse";
import { IEvent } from "../IEvent";

export interface IAffiliation {
  affiliate?: IUserResponse;
  event?: IEvent;
}
