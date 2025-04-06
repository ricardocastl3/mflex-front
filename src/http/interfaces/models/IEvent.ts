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
  slug: string;
  organizer?: IUser;
  main_address: string;
  reference_address: string;
  created_at: Date;
  tickets?: ITicket[];
}
