export interface IPlan {
  id: string;
  name: string;
  amount: number;
  features?: IPlanFeature[];
}

export interface IPlanFeature {
  id: string;
  name: string;
  code: string;
  available: boolean;
}
