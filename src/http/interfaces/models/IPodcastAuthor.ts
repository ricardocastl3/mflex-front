import { IPodcast } from "./IPodCast";

export interface IPodcastAuthor {
  id: string;
  name: string;
  photo: string;
  source: string;
  created_at: Date;
  podcasts?: IPodcast[];
}
