import { internalApi } from "@/http/axios/api";
import { ICategory } from "@/http/interfaces/models/ICategory";
import { useCallback, useEffect, useState } from "react";

export default function useCategory() {
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [allCategory, setAllCategory] = useState<ICategory[]>([]);

  const fetchAllCategory = useCallback(async () => {
    try {
      setIsLoadingCategory(true);
      const resp = await internalApi.get<{
        categories: ICategory[];
      }>("/categories");

      setAllCategory(resp.data.categories);
      setIsLoadingCategory(false);
    } catch (err) {
      setIsLoadingCategory(false);
    }
  }, []);

  const handleSeachByName = async (name: string) => {
    try {
      setIsLoadingCategory(true);
      const resp = await internalApi.get<{
        categories: ICategory[];
      }>("/categories", {
        params: {
          name,
        },
      });

      setAllCategory(resp.data.categories);
      setIsLoadingCategory(false);
    } catch (err) {
      setIsLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return {
    handleSeachByName,
    fetchAllCategory,
    isLoadingCategory,
    allCategory,
  };
}
