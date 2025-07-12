import { internalApi } from "@/http/axios/api";
import { ITutorial } from "@/http/interfaces/models/ITutorials";
import { useCallback, useEffect, useState } from "react";

export default function useTutorials({
  view,
}: {
  view: "affiliate" | "artist" | "organizer";
}) {
  const [isLoadingTutorial, setIsLoadingTutorial] = useState(true);
  const [allTutorial, setAllTutorial] = useState<ITutorial[]>([]);

  const fetchAllTutorial = useCallback(async () => {
    try {
      setIsLoadingTutorial(true);
      const resp = await internalApi.get<{
        tutorials: ITutorial[];
      }>("/tutorials", {
        params: {
          view,
        },
      });

      setAllTutorial(resp.data.tutorials);
      setIsLoadingTutorial(false);
    } catch (err) {
      setIsLoadingTutorial(false);
    }
  }, []);

  useEffect(() => {
    fetchAllTutorial();
  }, []);

  return {
    fetchAllTutorial,
    isLoadingTutorial,
    allTutorial,
  };
}
