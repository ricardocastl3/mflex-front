import { IUserResponse } from "../responses/IUserResponse";
import { IPayment } from "./IPayment";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  background?: string;
  type: string;
  ao_amount: string;
  us_amount: string;
  image_url?: string;
  image_top?: string;
  image_right?: string;
  webhook_id?: string;
  user: IUserResponse;
}

export interface I extends IProduct {
  created_at: Date;
  updated_at?: Date;
  payments?: IPayment[];
}
