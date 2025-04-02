import { IUserResponse } from "../responses/IUserResponse";
import { IPayment } from "./IPayment";
import { IUser } from "./IUser";

export interface ITransfer {
  id: string;
  iban?: string;
  status: string;
  user?: IUserResponse;
  payment: IPayment;
}
