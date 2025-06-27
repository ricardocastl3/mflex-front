import { Badge } from "@/@components/ui/Badge";
import { ICreator } from "@/http/interfaces/models/fhouse/ICreator";
import { useAppProvider } from "@/providers/app/AppProvider";
import { useAuth } from "@/providers/auth/AuthProvider";
import { internalApi } from "@/http/axios/api";
import { useEffect, useState } from "react";

import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import CAxiosErrorToastify from "@/http/errors/CAxiosErrorToastify";

export default function FollowCreatorButton({
  creator,
  type = "follow",
}: {
  type?: "follow" | "unfollow";
  creator?: ICreator;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { userLogged } = useAuth();

  const { handleAddToastOnArray } = useAppProvider();

  async function handleFollow() {
    try {
      setIsFollowing((state) => !state);
      await internalApi.post("/creators/follow", {
        id: creator?.id,
      });
    } catch (err) {
      return CAxiosErrorToastify({ err, openToast: handleAddToastOnArray });
    }
  }

  useEffect(() => {
    const find = creator?.followers.find(
      (i) => i.follower_id == userLogged?.id
    );
    if (find) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, []);

  return (
    <>
      <Badge
        onClick={handleFollow}
        variant={!isFollowing ? "primary" : "red"}
        weight={"sm"}
        className="font-bold cursor-pointer text-nowrap"
      >
        {!isFollowing && <CTranslateTo eng="+ Follow" pt="+ Seguir criador" />}
        {isFollowing && <CTranslateTo eng="Unfollow" pt="Deixar de seguir" />}
      </Badge>
    </>
  );
}
