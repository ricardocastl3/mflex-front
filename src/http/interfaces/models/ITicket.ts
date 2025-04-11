import { IEventTicket } from "./EventTicket";
import { IEvent } from "./IEvent";

export interface ITicket {
  id: string;
  amount: number;
  status: string;
  quantity: number;
  event_ticket?: IEventTicket;
}
