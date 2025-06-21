import { ICategory } from "./ICategory";
import { IPodcastAuthor } from "./IPodcastAuthor";
import { IResourceComment } from "./resources/IResourceComment";
import { IResourceLike } from "./resources/IResourceLike";
import { IResourceView } from "./resources/IResourceView";

export interface IPodcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  source: string;
  available: boolean;
  url: string;
  slug: string;
  started_at: Date;
  category_id: string;
  category?: ICategory;
  podcaster: IPodcastAuthor;

  comments: IResourceComment[];
  views:IResourceView[]
  likes:IResourceLike[]
  
  created_at: Date;
}
