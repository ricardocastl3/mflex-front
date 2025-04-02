import { IUserResponse } from "../responses/IUserResponse";
import { IPayment } from "./IPayment";

export interface ITransfer {
  id: string;
  iban?: string;
  status: string;
  organizer?: IUserResponse;
  payment: IPayment;
}
