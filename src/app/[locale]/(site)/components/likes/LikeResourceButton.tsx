import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";
import { IResourceLike } from "@/http/interfaces/models/resources/IResourceLike";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ResourceType } from "@/providers/features/ResourceProvider";
import { ReactIcons } from "@/utils/icons";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export default function LikeResourceButton({
  resource,
  other_id,
  iconSize = 20,
  pulse = true,
  other_likes,
}: {
  pulse?: boolean;
  iconSize?: number;
  other_id?: string;
  other_likes?: IResourceLike[];
  resource?: ResourceType;
}) {
  const { userLogged } = useAuth();
  const [alreadyLike, setAlreadyLike] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [total, setTotal] = useState(0);

  const soundRef = useRef<Howl | null>(null);

  const url = "/snds/like.mp3";

  async function handleLike() {
    try {
      const newAlreadyLikeState = !alreadyLike;
      setShowExplosion(newAlreadyLikeState);
      setAlreadyLike(newAlreadyLikeState);

      if (newAlreadyLikeState) {
        setTotal((t) => t + 1);
      } else {
        setTotal((t) => (t > 0 ? t - 1 : 0));
      }

      await internalApi.post("/users/likes", {
        id: other_id ? other_id : resource?.id,
      });
    } catch (err) {
      // Revert on error
      const revertedState = !alreadyLike;
      setShowExplosion(revertedState);
      setAlreadyLike(revertedState);

      if (revertedState) {
        setTotal((t) => t + 1);
      } else {
        setTotal((t) => (t > 0 ? t - 1 : 0));
      }
    }
  }

  useEffect(() => {
    const likes = resource ? resource.likes : other_likes ? other_likes : [];
    if (likes) {
      const findMe = likes.find((i) => i.user.id == userLogged?.id);
      setAlreadyLike(findMe ? true : false);
      setTotal(likes.length);
    }
  }, [resource, other_likes, userLogged]);

  useEffect(() => {
    if (soundRef.current) {
      if (alreadyLike && showExplosion) {
        soundRef.current.play();
      } else {
        soundRef.current.stop();
      }
    }
  }, [alreadyLike, showExplosion]);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [url],
      volume: 0.3,
      html5: true,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, []);

  return (
    <>
      {userLogged && (
        <div>
          <button
            onClick={handleLike}
            className={`${
              alreadyLike
                ? "bg-red-200 text-red-700 dark:bg-red-700/30 dark:text-red-500"
                : `${
                    pulse ? "animate-pulse" : ""
                  }ccbg-slate-400 text-slate-700 dark:bg-slate-700/50 dark:text-slate-500`
            } items-center relative text-sm flex gap-1.5 px-1 rounded-full p-0.5`}
          >
            <ReactIcons.Hi2Icon.HiHeart size={iconSize} />
            {`${total}`}
            {showExplosion && (
              <AuSoftUI.Component.ConfettiExplosion
                duration={2200}
                force={0.4}
                particleCount={10}
                width={400}
              />
            )}
          </button>
        </div>
      )}
    </>
  );
}
