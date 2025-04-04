import { IEvent } from "./IEvent";
import { INews } from "./INews";
import { IPodcast } from "./IPodCast";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  podcasts?: IPodcast[];
  events?: IEvent[];
  news?: INews[];
  created_at: Date;
}
