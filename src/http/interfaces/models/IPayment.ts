import { IUserResponse } from "../responses/IUserResponse";
import { ITicket } from "./ITicket";
import { ITransfer } from "./ITransfer";

export interface IPayment {
  id: string;
  amount: number;
  customer?: IUserResponse;
  customer_id?: string;
  payment_method: string;
  status?: string;
  out_trade_no?: string;
  client_id?: string;
  ticket?: ITicket;
  ticket_id?: string;
  created_at: Date;
  transferences?: ITransfer;
}
