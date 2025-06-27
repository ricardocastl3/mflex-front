export interface ICreatorSubscription {
  id: string;
  user_id?: string;
  ctr_storage: number;
  ctr_bandwith: number;
  subscription_id?: string;
  created_at: Date;
}
