export interface IPlan {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_trial?: boolean;
  features?: IPlanFeature[];
}

export interface IPlanFeature {
  id: string;
  name: string;
  code: string;
  available: boolean;
}
