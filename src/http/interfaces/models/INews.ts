import { ICategory } from "./ICategory";

export interface INews {
  id: string;
  title: string;
  content: string;
  image_url: string;
  slug: string;
  source: string;
  category?: ICategory;
  category_id?: string;
  created_at: Date;
}
