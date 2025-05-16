import { IPlan } from "./IPlan";

export interface ITVChannel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  available: boolean;
  is_public: boolean;
  st: number
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
  st: number
  me: boolean;
  public: boolean;
  plan: IPlan;
}
