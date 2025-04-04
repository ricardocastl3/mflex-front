import { IUserResponse } from "../responses/IUserResponse";
import { ICategory } from "./ICategory";
import { ITicket } from "./ITicket";
import { IUser } from "./IUser";

export interface IEvent {
  id: string;
  title: string;
  amount: number;
  description: string;
  map_location: string;
  image_url: string;
  start_at: Date;
  category?: ICategory;
  category_id?: string;
  organizer?: IUser;
  organizer_id?: string;
  main_address: string;
  reference_address: string;
  created_at: Date;
  tickets?: ITicket[];
}
