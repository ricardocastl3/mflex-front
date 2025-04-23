import { IEvent } from "./IEvent";
import { ITicket } from "./ITicket";

export interface IEventTicket {
  id: string;
  amount: number;
  name: string;
  description: string;
  status: string;
  event_id: string;
  tickets: ITicket[];
  limit: number;
  created_at: Date;
  event: IEvent;
}
