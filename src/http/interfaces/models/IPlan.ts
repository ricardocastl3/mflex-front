export interface IPlan {
  id: string;
  name: string;
  amount: number;
  description: string;
  flex_movies: boolean;
  flex_tv: boolean;
  is_trial?: boolean;
  features?: IPlanFeature[];
}

export interface IPlanFeature {
  id: string;
  name: string;
  code: string;
  available: boolean;
}
