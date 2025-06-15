import { IUserResponse } from "../../responses/IUserResponse";
import { IEvent } from "../organizer/IEvent";

export interface IAffiliation {
  affiliate?: IUserResponse;
  event?: IEvent;
}
