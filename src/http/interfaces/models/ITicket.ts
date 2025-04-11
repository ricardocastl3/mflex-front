import { IUserResponse } from "../responses/IUserResponse";
import { IEventTicket } from "./EventTicket";
import { IEvent } from "./IEvent";

export interface ITicket {
  id: string;
  amount: number;
  status: string;
  quantity: number;
  customer: IUserResponse;
  event_ticket?: IEventTicket;
}
