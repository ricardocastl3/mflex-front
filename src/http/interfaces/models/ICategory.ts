import { INews } from "./INews";
import { IPodcast } from "./IPodCast";
import { IEvent } from "./organizer/IEvent";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  podcasts?: IPodcast[];
  events?: IEvent[];
  news?: INews[];
  created_at: Date;
}
