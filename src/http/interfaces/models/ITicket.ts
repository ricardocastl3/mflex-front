import { IEvent } from "./IEvent";

export interface ITicket {
  id: string;
  amount: number;
  name: string;
  description: string;
  quantity: number;
  event?: IEvent;
}
