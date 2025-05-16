import { IPlan } from "./IPlan";

export interface ITVChannel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  available: boolean;
  is_public: boolean;
  description?: string;
  plan: IPlan;
  plan_id: string;
}

export interface ITVCategoryChannels {
  me: {
    id: string;
    name: string;
    tv_channels: ITVChannel[];
  }[];
  others: {
    id: string;
    name: string;
    tv_channels: ITVChannel[];
  }[];
}

// SAFED TO FRONT
export interface ITVCategorySafed {
  id: string;
  name: string;
  tv: ITVChannelSafed[];
}

export interface ITVChannelSafed {
  id: string;
  name: string;
  logo?: string;
  me: boolean;
  public: boolean;
  plan: IPlan;
}
