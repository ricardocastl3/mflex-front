import { IUser } from "./IUser";

export interface ISettings {
  id: string;
  locale: string;
  twoFactor: boolean;
  whatsapp_notify: boolean;
  telegram_notify: boolean;
  user: IUser;
}
