import { Decimal } from "@prisma/client/runtime/library";
import { ITicket } from "../tickets/ITicket";
import { ITransference } from "../transfer/ITransference";

export interface IPayment {
  id: string;
  amount: number;
  customer?: { id: string };
  customer_id?: string;
  payment_method: string;
  status?: string;
  out_trade_no?: string;
  client_id?: string;
  ticket?: ITicket;
  ticket_id?: string;
  created_at: Date;
  transferences?: ITransference;
}
