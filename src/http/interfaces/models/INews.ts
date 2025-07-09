import { ICategory } from "./ICategory";
import { IResourceComment } from "./resources/IResourceComment";
import { IResourceLike } from "./resources/IResourceLike";
import { IResourceView } from "./resources/IResourceView";

export interface INews {
  id: string;
  title: string;
  content: string;
  image_url: string;
  slug: string;
  source: string;
  updated_at: Date;
  category?: ICategory;
  category_id?: string;

  comments: IResourceComment[];
  views: IResourceView[];
  likes: IResourceLike[];

  created_at: Date;
}
