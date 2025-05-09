import { IEventTicket } from "./IEventTicket";
import { ICategory } from "./ICategory";

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
  created_at: Date;
  category: ICategory;
  rejected_reason?: string;
  organizer: {
    email?: string;
    first_name: string;
    last_name: string;
  };
  event_tickets: IEventTicket[];
}
