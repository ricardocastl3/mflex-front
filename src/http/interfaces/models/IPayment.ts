import { IUserResponse } from "../responses/IUserResponse";

export interface IPayment {
  id?: string;
  user: IUserResponse;
  product?: { id: string; title: string };
  ao_amount: string;
  us_amount: string;
  customer: string;
  customer_phone: string;
  created_at: Date;
  payment_method: string;
  status: string;
}
