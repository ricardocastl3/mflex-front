import { IEvent } from "./IEvent";

export interface ITicket {
  id: string;
  amount: number;
  quantity: number;
  event?: IEvent;
}
