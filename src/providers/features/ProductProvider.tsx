import { IProduct } from "@/http/interfaces/models/IProduct";
import { createContext, ReactNode, useContext, useState } from "react";

interface IProductProviderProps {
  selectedProduct: IProduct | undefined;
  fetchProduct: boolean;

  handleFetchProduct: (mode: boolean) => void;
  handleSelectProduct: (product: IProduct | undefined) => void;
}

export const ProductContext = createContext({} as IProductProviderProps);

export function useProductProvider() {
  const context = useContext(ProductContext);
  return context;
}

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [fetchProduct, setFetchProduct] = useState(false);

  function handleFetchProduct(mode: boolean) {
    setFetchProduct(mode);
  }

  function handleSelectProduct(product: IProduct | undefined) {
    setSelectedProduct(product);
  }

  return (
    <ProductContext.Provider
      value={{
        handleSelectProduct,
        selectedProduct,
        fetchProduct,
        handleFetchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
