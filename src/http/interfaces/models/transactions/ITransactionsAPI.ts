import { IAffiliation } from "../affiliate/IAffiliate";
import { IPayment } from "../IPayment";
import { ITransfer } from "../ITransfer";

export interface IOrganizerTransactionAPI {
  transactions: IPayment[];
  has: boolean;
  total: number;
  dash: {
    gain: number;
    failed: number;
    pending: number;
    success: number;
  };
}

export interface IAffiliateCommissionsResponseAPI {
  has: boolean;
  total: number;
  success: boolean;
  commissions: ITransfer[];
  affiliations: IAffiliation[];
  dash: {
    gain: number;
  };
}

export interface IOrganizerTransferResponseAPI {
  has: boolean;
  total: number;
  transfers: ITransfer[];
}
