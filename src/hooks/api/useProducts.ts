import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IProduct } from "@/http/interfaces/models/IProduct";
import { useCallback, useEffect, useState } from "react";

export default function useProducts({
  route,
}: {
  route: "merchant" | "product";
}) {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(true);

  const fetchAllProducts = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        products: IProduct[];
      }>("/products", {
        params: {
          mode: route == "merchant" ? "all" : undefined,
        },
      });

      setAllProducts(resp.data.products);
      setIsLoadingAllProducts(false);
    } catch (err) {
      setIsLoadingAllProducts(false);
    }
  }, []);

  async function handleSeachByName({ name }: ISearchDataField) {
    try {
      setIsLoadingAllProducts(true);

      const resp = await internalApi.get<{
        products: IProduct[];
      }>("/products", {
        params: { name, mode: route == "merchant" ? "all" : undefined },
      });

      setAllProducts(resp.data.products);
      setIsLoadingAllProducts(false);
    } catch (err) {
      setIsLoadingAllProducts(false);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return {
    fetchAllProducts,
    allProducts,
    handleSeachByName,
    isLoadingAllProducts,
  };
}
