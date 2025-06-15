import { IUserResponse } from "../../responses/IUserResponse";
import { ICategory } from "../ICategory";
import { IEventTicket } from "./IEventTicket";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  image_url: string;
  start_at: Date;
  slug: string;
  main_address: string;
  map_location: string;
  reference_address: string;
  can_sell_ticket: boolean;
  created_at: Date;
  category: ICategory;
  rejected_reason?: string;
  affiliation: { affiliate: IUserResponse };
  organizer: {
    email?: string;
    first_name: string;
    last_name: string;
  };
  event_tickets: IEventTicket[];
}
