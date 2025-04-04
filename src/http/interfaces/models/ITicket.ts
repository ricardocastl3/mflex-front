import { Decimal } from "@prisma/client/runtime/library";
import { IIAngolanReference } from "../angolan-reference/IAngolanReference";
import { IEvent } from "../events/IEvent";
import { IPayment } from "../payments/IPayment";
import { IUserResponse } from "../users/IUserResponse";

export interface ITicket {
  id: string;
  amount: Decimal;
  quantity: number;
  customer?: IUserResponse;
  customer_id?: string;
  angolan_reference?: IIAngolanReference;
  payment?: IPayment;
  event?: IEvent;
  event_id?: string;
  created_at: Date;
}
