interface IDropBase {
  title_en: string;
  title_pt: string;
  value: string;
}

export const statusTransaction: IDropBase[] = [
  {
    title_en: "Pending",
    title_pt: "Pendentes",
    value: "pending",
  },
  {
    title_en: "Success",
    title_pt: "Sucesso",
    value: "success",
  },
  {
    title_en: "Failed",
    title_pt: "Falhadas",
    value: "failed",
  },
];

export const methodTransactions: IDropBase[] = [
  {
    title_en: "Multicaixa App",
    title_pt: "App. Multicaixa",
    value: "multicaixa",
  },
  {
    title_en: "Reference",
    title_pt: "Referência",
    value: "reference",
  },
  {
    title_en: "PayPay APP",
    title_pt: "App. PayPay",
    value: "paypay",
  },
];
