import { internalApi } from "@/http/axios/api";
import { ICategory } from "@/http/interfaces/models/ICategory";
import { useCallback, useEffect, useState } from "react";

export default function useCategory({
  view,
}: {
  view: "events" | "news" | "podflex";
}) {
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [allCategory, setAllCategory] = useState<ICategory[]>([]);

  const fetchAllCategory = useCallback(async () => {
    try {
      setIsLoadingCategory(true);
      const resp = await internalApi.get<{
        categories: ICategory[];
      }>("/categories", {
        params: {
          view,
        },
      });

      setAllCategory(resp.data.categories);
      setIsLoadingCategory(false);
    } catch (err) {
      setIsLoadingCategory(false);
    }
  }, []);

  const handleSeachByName = async (name: string, view: string) => {
    try {
      setIsLoadingCategory(true);
      const resp = await internalApi.get<{
        categories: ICategory[];
      }>("/categories", {
        params: {
          name,
          view,
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
