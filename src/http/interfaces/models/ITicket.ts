import { IUserResponse } from "../responses/IUserResponse";
import { IEventTicket } from "./IEventTicket";
import { IEvent } from "./IEvent";

export interface ITicket {
  id: string;
  amount: number;
  status: string;
  quantity: number;
  event_name: string;
  event_start_at: Date;
  event_organizer: string;
  event_ticket_name: string;
  customer: IUserResponse;
  event_ticket?: IEventTicket;
}

export interface IUserTickerResponseAPI {
  total: number;
  has: boolean;
  tickets: ITicket[];
}
