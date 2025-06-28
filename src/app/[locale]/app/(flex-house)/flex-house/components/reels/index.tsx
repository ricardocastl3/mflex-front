"use client";

import { useFlexHouseProvider } from "@/providers/features/FlexHouseProvider";
import { ReactIcons } from "@/utils/icons";
import { AuSoftUI } from "@/@components/(ausoft)";
import { useEffect, useState, useRef } from "react";
import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useResourceProvider } from "@/providers/features/ResourceProvider";

import ReelPlayerCard from "./ReelPlayerCard";
import ReelCommentCard from "./comments/ReelCommentsCard";
import useCreatorPost from "@/hooks/api/creators/useCreatorPosts";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function Reels() {
  const {
    openReelCommentContainer,
    handleSelectFHTab,
    handleOpenReelCommentContainer,
  } = useFlexHouseProvider();

  const { fetchResource } = useResourceProvider();

  const { allCreatorPosts, fetchAllCreatorPosts, isLoadingCreatorPosts } =
    useCreatorPost({
      view: "reel",
    });

  const [currentIndex, setCurrentIndex] = useState(0);
  const posts = allCreatorPosts.posts || [];

  const [currentPost, setCurrentPost] = useState<ICreatorPost | undefined>();
  const [animationDirection, setAnimationDirection] = useState<
    "up" | "down" | null
  >(null);

  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoadingCreatorPosts) {
      setCurrentPost(allCreatorPosts.posts[currentIndex]);
    }
  }, [isLoadingCreatorPosts, currentIndex]);

  useEffect(() => {
    if (animationDirection) {
      const timeout = setTimeout(() => setAnimationDirection(null), 500);
      return () => clearTimeout(timeout);
    }
  }, [animationDirection]);

  // Prevenir reload da página no mobile
  useEffect(() => {
    const preventReload = (e: Event) => {
      e.preventDefault();
    };

    // Adicionar event listeners para prevenir reload
    document.addEventListener("touchmove", preventReload, { passive: false });
    document.addEventListener("wheel", preventReload, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventReload);
      document.removeEventListener("wheel", preventReload);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    if (currentIndex < posts.length) {
      setAnimationDirection("down");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (window.innerWidth <= 765 && !openReelCommentContainer) {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (diffY > 50) {
        // Swipe para cima: próximo reel
        handleNext();
      } else if (diffY < -50) {
        // Swipe para baixo: reel anterior
        handlePrev();
      }
      touchStartY.current = null;
    }
  };

  useEffect(() => {
    if (fetchResource) fetchAllCreatorPosts();
  }, [fetchResource]);

  if (isLoadingCreatorPosts && posts.length <= 0) {
    return (
      <div className="fixed inset-0 bg-black/90 z-30 flex items-center justify-center">
        <span className="text-white text-xl">
          <CTranslateTo eng="Loading reels..." pt="Carregando reels..." />
        </span>
      </div>
    );
  }

  if (!isLoadingCreatorPosts && !currentPost) {
    return (
      <div className="fixed inset-0 bg-black/90 flex-col gap-4 z-30 flex items-center justify-center">
        <span className="text-white text-xl">
          <CTranslateTo eng="No more reels" pt="Sem mais reels" />
        </span>
        <AuSoftUI.UI.Button
          onClick={() => handleSelectFHTab("feed")}
          variant={"primary"}
          size={"sm"}
        >
          <CTranslateTo eng="Back to home" pt="Voltar a casa" />
        </AuSoftUI.UI.Button>
      </div>
    );
  }

  if (currentPost)
    return (
      <div
        className={`fixed inset-0 w-full bg-black/90 z-30 flex md:justify-center justify-stretch`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`md:h-[100vh] h-full flex md:justify-center justify-stretch w-full gap-4 md:py-3 py-0 `}
        >
          <div
            className={`flex justify-center rounded-xl h-full transition-all duration-500`}
          >
            <div
              className={` ${
                animationDirection === "up" ? "animate-fade-up" : ""
              }
            ${animationDirection === "down" ? "animate-fade-down" : ""} h-full`}
            >
              <ReelPlayerCard change={currentIndex} post={currentPost} />
            </div>

            <div className="absolute top-[40%] right-5 p-4 items-center flex-col gap-5 md:flex hidden">
              <AuSoftUI.UI.Button
                variant={"default"}
                className="rounded-full border border-slate-700 p-4 text-white"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ReactIcons.PiIcon.PiCaretUp size={20} />
              </AuSoftUI.UI.Button>
              <AuSoftUI.UI.Button
                variant={"default"}
                className="rounded-full p-4 border border-slate-700  text-white"
                onClick={handleNext}
                disabled={
                  currentIndex === posts.length - 1 && !allCreatorPosts.has
                }
              >
                <ReactIcons.PiIcon.PiCaretDown size={20} />
              </AuSoftUI.UI.Button>
            </div>
          </div>

          {openReelCommentContainer && (
            <div
              className={`animate-fade-left h-[96vh] md:flex hidden w-[40vw] rounded-xl  overflow-y-auto px-1`}
            >
              <div className="h-full w-full">
                <ReelCommentCard post={currentPost} />
              </div>
            </div>
          )}

          {openReelCommentContainer && (
            <div className="md:hidden flex w-full flex-1 fixed z-30 bg-black/50 inset-0 flex-col justify-end md:items-end items-stretch h-full">
              <div>
                <button
                  onClick={() => handleOpenReelCommentContainer(false)}
                  className="h-fit animate-fade-up duration-75 rounded-full bg-white font-bold text-lg px-2.5 m-2 justify-self-end flex"
                >
                  x
                </button>
                <div className="animate-fade-up duration-75 w-full md:h-full h-[76vh] bg-white dark:bg-[#0f121c] justify-self-end overflow-y-auto md:rounded-t-none rounded-t-2xl">
                  <ReelCommentCard post={currentPost} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
