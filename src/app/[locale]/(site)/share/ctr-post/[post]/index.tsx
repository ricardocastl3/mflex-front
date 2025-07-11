"use client";

import { use, useCallback, useEffect } from "react";
import { internalApi, langByCookies } from "@/http/axios/api";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import LoadingLayout from "@/app/onload-pages/_loading-layouts";

type Props = {
  params: Promise<{ post: string }>;
};

export default function PreviewNew({ params }: Props) {
  const pars = use(params);
  const { fetchResource } = useResourceProvider();

  const fetchPost = useCallback(async () => {
    try {
      const resp = await internalApi.get("/shares/ctr-post", {
        params: {
          id: pars.post,
        },
      });

      window.location.href = `/${langByCookies}/app/flex-house?lkp=${resp.data.post.id}`;
    } catch (err) {
      window.location.href = `/${langByCookies}`;
    }
  }, []);

  useEffect(() => {
    if (fetchResource) fetchPost();
  }, [fetchResource]);

  useEffect(() => {
    fetchPost();
  }, []);

  return <LoadingLayout />;
}
