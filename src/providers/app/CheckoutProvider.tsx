"use client";

import React, { createContext, useContext, useState } from "react";

import { ITicket } from "@/http/interfaces/models/ITicket";

export type TAngolanMethods = "reference" | "express" | "paypay";

export type InvoiceType =
  | "ausoft-coins"
  | "sell-coins"
  | "buy-coins"
  | "subscriptions";

export interface IInvoiceTransaction {
  trasaction_id: string;
  type: InvoiceType;
}

interface IPrice {
  monthly: "yes" | "no";
  type: "subs" | "others" | "packs";
  price: string;
  amount: number;
}

interface ITicketAmount {
  amount: number;
  name: string;
}

interface ICheckoutProduct {
  customer: string;
  email: string;
  phone: string;
  amount?: number;
}

interface ICheckoutContextProps {
  itemPriceIdCheckoutSelected: IPrice | undefined;
  selectedAngolanMethod: TAngolanMethods;
  selectedViewedInvoice: IInvoiceTransaction;
  backToCheckoutUrl: string | undefined;
  amountPriceSelected: ITicketAmount | undefined;
  selectedProduct: ITicket | undefined;
  selectedCustomerBuyed: ICheckoutProduct | undefined;
  isPurchased: boolean;

  handleIsPurchased: (mode: boolean) => void;
  handleSelectCustomerBuyed: (customer: ICheckoutProduct | undefined) => void;
  handleSelectProduct: (product: ITicket | undefined) => void;
  handlePriceAmountSelected: (product: ITicketAmount | undefined) => void;
  handleBackToCheckoutUrl: (url: string | undefined) => void;
  handleSelectViewInvoice: (type: IInvoiceTransaction) => void;
  handleSelectAngolanMethod: (method: TAngolanMethods) => void;
  handleAddItemOnCheckout: (item: IPrice | undefined) => void;
}

const CheckoutContext = createContext({} as ICheckoutContextProps);

export function useCheckoutProvider() {
  const context = useContext(CheckoutContext);
  return context;
}

export default function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemPriceIdCheckoutSelected, setItemPriceIdCheckoutSelected] =
    useState<IPrice | undefined>();
  const [selectedAngolanMethod, setSelectedAngolanMethod] =
    useState<TAngolanMethods>("reference");

  const [isPurchased, setIsPurchased] = useState(false);

  const [amountPriceSelected, setAmountPriceSelected] = useState<
    ITicketAmount | undefined
  >();

  const [selectedCustomerBuyed, setSelectedCustomerBuyed] = useState<
    ICheckoutProduct | undefined
  >();

  const [selectedViewedInvoice, setSelectedViewedInvoice] =
    useState<IInvoiceTransaction>({ trasaction_id: "", type: "ausoft-coins" });

  const [backToCheckoutUrl, setBackToCheckoutUrl] = useState<
    string | undefined
  >();

  const [selectedProduct, setSelectedProduct] = useState<
    ITicket | undefined
  >();

  function handleAddItemOnCheckout(item: IPrice | undefined) {
    setItemPriceIdCheckoutSelected(item);
  }

  function handleIsPurchased(mode: boolean) {
    setIsPurchased(mode);
  }

  function handleSelectAngolanMethod(method: TAngolanMethods) {
    setSelectedAngolanMethod(method);
  }

  function handleSelectViewInvoice(transaction: IInvoiceTransaction) {
    setSelectedViewedInvoice(transaction);
  }

  function handleBackToCheckoutUrl(url: string | undefined) {
    setBackToCheckoutUrl(url);
  }

  function handlePriceAmountSelected(product: ITicketAmount | undefined) {
    setAmountPriceSelected(product);
  }

  function handleSelectProduct(product: ITicket | undefined) {
    setSelectedProduct(product);
  }

  function handleSelectCustomerBuyed(customer: ICheckoutProduct | undefined) {
    setSelectedCustomerBuyed(customer);
  }

  return (
    <CheckoutContext.Provider
      value={{
        handleAddItemOnCheckout,
        handleSelectAngolanMethod,
        handleSelectViewInvoice,
        handleBackToCheckoutUrl,
        handlePriceAmountSelected,
        handleSelectProduct,
        handleIsPurchased,
        handleSelectCustomerBuyed,

        isPurchased,
        selectedCustomerBuyed,
        selectedProduct,
        amountPriceSelected,
        backToCheckoutUrl,
        selectedViewedInvoice,
        selectedAngolanMethod,
        itemPriceIdCheckoutSelected,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
