import { IUser } from "./IUser";

export interface IProfile {
  biography: string;
  phone_number: string;
  phone_verified?: boolean;
  user: IUser;
  gender: string;
  nationality: string;
  birthday: string;

  address: string;
  affiliate_code?: string;
  affiliate_active?: boolean;
  affiliate_request?: boolean;
}
