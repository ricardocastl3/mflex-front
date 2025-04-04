import { ICategory } from "./ICategory";
import { IPodcastAuthor } from "./IPodcastAuthor";

export interface IPodcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  source: string;
  url: string;
  started_at: Date;
  category?: ICategory;
  category_id?: string;
  podcaster: IPodcastAuthor;
  podcaster_id: string;
  created_at: Date;
}
