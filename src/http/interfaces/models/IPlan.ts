export interface IPlan {
  id: string;
  name: string;
  amount: number;
  description: string;
  flex_movie: boolean;
  art_musics?: number;
  flex_tv: boolean;
  is_trial?: boolean;
  football_ai?: number;
  tickets_amount?: number;
  features?: IPlanFeature[];
}

export interface IPlanFeature {
  id: string;
  name: string;
  code: string;
  available: boolean;
}
