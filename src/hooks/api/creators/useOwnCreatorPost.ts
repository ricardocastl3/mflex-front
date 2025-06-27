import { ISearchDataField } from "@/@components/(system)/ASearch/SearchDataField";
import { internalApi } from "@/http/axios/api";
import { ICreatorPostAPI } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { appConfigs } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";

export default function useOwnCreatorPost({
  side = "page",
}: {
  side?: "box" | "page";
}) {
  const [isLoadingCreatorPosts, setIsLoadingCreatorPosts] = useState(true);
  const [allCreatorPosts, setAllCreatorPosts] = useState<ICreatorPostAPI>({
    has: true,
    posts: [],
    total: 0,
  });

  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);

  const fetchAllCreatorPosts = useCallback(async () => {
    try {
      setIsLoadingCreatorPosts(true);
      const resp = await internalApi.get<ICreatorPostAPI>("/creators/me", {
        params: {
          currentPage: 0,
          nextPage: side == "box" ? 99999 : appConfigs.api.pageLoads,
        },
      });

      setAllCreatorPosts(resp.data);
      setIsLoadingCreatorPosts(false);
    } catch (err) {
      setIsLoadingCreatorPosts(false);
    }
  }, []);

  const handleSeachByName = async (name: string, view: string) => {
    try {
      setIsLoadingCreatorPosts(true);
      const resp = await internalApi.get<ICreatorPostAPI>("/creators/me", {
        params: {
          currentPage: 0,
          nextPage: 1,
          name,
          view,
        },
      });

      setAllCreatorPosts(resp.data);
      setIsLoadingCreatorPosts(false);
    } catch (err) {
      setIsLoadingCreatorPosts(false);
    }
  };

  async function handleLoadMore({ name }: ISearchDataField) {
    try {
      setIsLoadingMorePosts(true);
      name = name == "" ? undefined : name;

      const resp = await internalApi.get<ICreatorPostAPI>("/creators/me", {
        params: {
          name,
          currentPage: allCreatorPosts.posts.length,
          nextPage: appConfigs.api.pageLoads,
        },
      });

      if (resp.data.has) {
        setAllCreatorPosts((state) => ({
          ...state,
          has: resp.data.has,
          total: resp.data.total,
          posts: [...state.posts, ...resp.data.posts],
        }));
      } else {
        setAllCreatorPosts((state) => ({
          ...state,
          has: false,
        }));
      }

      setIsLoadingMorePosts(false);
    } catch (err) {
      setIsLoadingMorePosts(false);
    }
  }

  useEffect(() => {
    fetchAllCreatorPosts();
  }, []);

  return {
    handleSeachByName,
    handleLoadMore,
    isLoadingMorePosts,
    fetchAllCreatorPosts,
    isLoadingCreatorPosts,
    allCreatorPosts,
  };
}
