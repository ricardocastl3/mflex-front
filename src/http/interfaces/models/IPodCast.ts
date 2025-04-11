import { ICategory } from "./ICategory";
import { IPodcastAuthor } from "./IPodcastAuthor";

export interface IPodcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  source: string;
  available:boolean
  url: string;
  slug: string;
  started_at: Date;
  category?: ICategory;
  podcaster: Omit<IPodcastAuthor, "created_at" | "id">;
  created_at: Date;
}
