import { IUser } from "./IUser";

export interface IProfile {
  biography: string;
  phone_number: string;
  phone_verified?: boolean;
  user: IUser;
  address: string;
}
