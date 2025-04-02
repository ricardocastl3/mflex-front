export interface IFinance {
  id?: string;
  iban: string;
  owner: string;
  cp_wallet: string;
  type: string;
  swift?: string;
  paypay_id: string;
}
