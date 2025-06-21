export interface IResourceNotification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  url: string;
  blank: boolean;
  created_at: Date;
}

export interface IResourceNotificationAPI {
  reads: number;
  unreads: number;
  total: number;
  notifications: IResourceNotification[];
}
