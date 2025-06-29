"use client";

import { INews } from "@/http/interfaces/models/INews";
import { use, useCallback, useEffect, useState } from "react";
import { ReactIcons } from "@/utils/icons";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import NewSkeleton from "./NewSkeleton";
import HeroNews from "../components/Hero";
import useNews from "@/hooks/api/useNews";
import NewsRelated from "./components/NewsRelated";
import NewsOthers from "./components/NewsOthers";
import NewContent from "./components/NewContent";
import CommentContainer from "../../components/comments/CommentContainer";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function PreviewNew({ params }: Props) {
  const pars = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<INews | undefined>();

  const { isLoadingAllNews, allNews } = useNews({ route: "slug" });

  const { fetchResource } = useResourceProvider();

  const fetchNews = useCallback(async () => {
    try {
      const resp = await internalApi.get("/news", {
        params: {
          slug: pars.slug,
        },
      });

      if (!resp.data.news.available) {
        window.location.href = `/${langByCookies}/news`;
        return;
      }
      setSelectedNews(resp.data.news);
      setIsLoading(false);
    } catch (err) {
      window.location.href = `/${langByCookies}/news`;
    }
  }, []);

  useEffect(() => {
    if (fetchResource) fetchNews();
  }, [fetchResource]);

  useEffect(() => {
    fetchNews();
  }, []);

  if (isLoading || isLoadingAllNews) {
    return (
      <div className="flex flex-col">
        <div className="relative">
          <HeroNews />
          <div className="absolute inset-0 justify-center flex items-center">
            <ReactIcons.PiIcon.PiSpinner
              size={40}
              className="animate-spin text-white"
            />
          </div>
        </div>
        <NewSkeleton />
      </div>
    );
  }

  if (selectedNews && !isLoading && !isLoadingAllNews)
    return (
      <div className="flex flex-col gap-8 w-full items-stretch">
        <div className="relative">
          <HeroNews />
          <div className="w-full flex z-20 absolute inset-0 justify-center items-center">
            <div className="md:w-[60vw] w-[90vw] md:px-8 p-4 text-center">
              <h1 className="md:text-[1.8rem] text-2xl md:leading-[3rem] leading-[2rem] text-center text-white">
                {selectedNews.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-8 md:px-[3rem] px-4">
          <NewContent news={selectedNews} />
          <NewsRelated
            displayMode="desktop"
            newElement={selectedNews}
            news={allNews}
          />
          <CommentContainer displayMode="mobile" resource={selectedNews} />
        </div>

        <NewsRelated
          displayMode="mobile"
          newElement={selectedNews}
          news={allNews}
        />
        <CommentContainer displayMode="desktop" resource={selectedNews} />

        <NewsOthers newElement={selectedNews} news={allNews} />
      </div>
    );
}
