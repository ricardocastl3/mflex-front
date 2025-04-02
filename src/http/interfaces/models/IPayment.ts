import { IUserResponse } from "../responses/IUserResponse";
import { IUser } from "./IUser";

export interface IPayment {
  id?: string;
  user: IUserResponse;
  tickets?: { id: string; title: string };
  amount: string;
  customer: IUser;
  payment_method: string;
  status: string;
}
