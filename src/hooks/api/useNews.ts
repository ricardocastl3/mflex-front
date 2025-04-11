import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { INews } from "@/http/interfaces/models/INews";
import { useCallback, useEffect, useState } from "react";

export default function useNews() {
  const [allNews, setAllNews] = useState<INews[]>([]);
  const [isLoadingAllNews, setIsLoadingAllNews] = useState(true);

  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);

  const fetchAllNews = useCallback(async () => {
    try {
      const resp = await internalApi.get<{
        news: INews[];
      }>(`/news`, {
        params: {
          currentPage: 0,
          nextPage: 4,
        },
      });

      setAllNews(resp.data.news);
      setIsLoadingAllNews(false);
    } catch (err) {
      setIsLoadingAllNews(false);
    }
  }, []);

  async function handleSeachByName({ name, category_id }: ISearchDataField) {
    try {
      setIsLoadingAllNews(true);

      name = name == "" ? undefined : name;
      category_id = category_id == "" ? undefined : category_id;

      const resp = await internalApi.get<{
        news: INews[];
      }>(`/news`, {
        params: { name, category_id, currentPage: 0, nextPage: 4 },
      });

      if (resp.data.news.length > 0) {
        setHasMoreNews(true);
      }

      setAllNews(resp.data.news);
      setIsLoadingAllNews(false);
    } catch (err) {
      setIsLoadingAllNews(false);
    }
  }

  async function handleLoadMore({ name, mode, category_id }: ISearchDataField) {
    try {
      setIsLoadingMoreNews(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<{
        news: INews[];
      }>(`/news`, {
        params: {
          name,
          category_id,
          currentPage: allNews.length,
          nextPage: 4,
        },
      });

      if (resp.data.news.length <= 0) {
        setHasMoreNews(false);
      } else {
        setAllNews((state) => [...state, ...resp.data.news]);
      }

      setIsLoadingMoreNews(false);
    } catch (err) {
      setIsLoadingMoreNews(false);
    }
  }

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  return {
    handleLoadMore,
    hasMoreNews,
    fetchAllNews,
    allNews,
    isLoadingMoreNews,
    handleSeachByName,
    isLoadingAllNews,
  };
}
