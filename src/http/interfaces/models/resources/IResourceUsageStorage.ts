export interface IResourceUsageStorage {
  id: string;
  megabytes: number;
  media_type: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
