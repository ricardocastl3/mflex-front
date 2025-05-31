import { IUser } from "./IUser";

export interface IProfile {
  biography: string;
  phone_number: string;
  phone_verified?: boolean;
  user: IUser;
  address: string;
  affiliate_code?: string;
  affiliate_active?: boolean;
  affiliate_request?: boolean;
}
