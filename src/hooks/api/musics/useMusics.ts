import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { IMusicResponseAPI } from "@/http/interfaces/models/artists/IMusic";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useMusics({
  route,
}: {
  route: "app" | "public" | "slug";
}) {
  const [allMusics, setAllMusics] = useState<IMusicResponseAPI>({
    has: false,
    musics: [],
    total: 0,
  });
  const [isLoadingAllMusics, setIsLoadingAllMusics] = useState(true);
  const [isLoadingMoreMusics, setIsLoadingMoreMusics] = useState(false);

  const apiRoutes = `/artists/musics/${route == "app" ? "me" : ""}`;

  const fetchAllMusics = useCallback(async () => {
    try {
      const resp = await internalApi.get<IMusicResponseAPI>(apiRoutes, {
        params: {
          currentPage: 0,
          nextPage: route == "slug" ? 9999 : appConfigs.api.pageLoads,
        },
      });

      setAllMusics(resp.data);
      setIsLoadingAllMusics(false);
    } catch (err) {
      setIsLoadingAllMusics(false);
    }
  }, []);

  async function handleSeachByName({ name, category_id }: ISearchDataField) {
    try {
      setIsLoadingAllMusics(true);

      name = name == "" ? undefined : name;
      category_id = category_id == "" ? undefined : category_id;

      const resp = await internalApi.get<IMusicResponseAPI>(apiRoutes, {
        params: { name, category_id, currentPage: 0, nextPage: appConfigs.api.pageLoads },
      });

      setAllMusics(resp.data);
      setIsLoadingAllMusics(false);
    } catch (err) {
      setIsLoadingAllMusics(false);
    }
  }

  async function handleLoadMore({ name, category_id }: ISearchDataField) {
    try {
      setIsLoadingMoreMusics(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<IMusicResponseAPI>(apiRoutes, {
        params: {
          name,
          category_id,
          currentPage: allMusics?.musics.length,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (resp.data.has) {
        setAllMusics((state) => ({
          ...state,
          has: resp.data.has,
          total: resp.data.total,
          musics: [...state.musics, ...resp.data.musics],
        }));
      } else {
        setAllMusics((state) => ({
          ...state,
          has: false,
        }));
      }

      setIsLoadingMoreMusics(false);
    } catch (err) {
      setIsLoadingMoreMusics(false);
    }
  }

  useEffect(() => {
    fetchAllMusics();
  }, [fetchAllMusics]);

  return {
    handleLoadMore,
    fetchAllMusics,
    allMusics,
    isLoadingMoreMusics,
    handleSeachByName,
    isLoadingAllMusics,
  };
}
