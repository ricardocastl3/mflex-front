import { ICreatorPost } from "@/http/interfaces/models/fhouse/ICreatorPost";
import { useEffect, useRef, useState } from "react";

import FormmattedDescription from "./FormmattedDescription";
import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function FormattedBreakDescription({
  post,
  type,
}: {
  post: ICreatorPost;
  type: "comment" | "post";
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [viewAllContent, setViewAllContent] = useState(false);
  const [dynamicWidth, setDynamicWidth] = useState("200px");
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        const parentWidth = parentRef.current.clientWidth;
        const width90 = Math.floor(parentWidth * 0.5);
        setDynamicWidth(`${width90}px`);
      }
    };

    const checkIfTruncated = () => {
      if (textRef.current) {
        const isTruncated =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTextTruncated(isTruncated);
      }
    };

    updateWidth();
    checkIfTruncated();

    window.addEventListener("resize", () => {
      updateWidth();
      setTimeout(checkIfTruncated, 100); // Delay to ensure width is updated
    });

    return () => window.removeEventListener("resize", updateWidth);
  }, [post.description]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div ref={parentRef} className="flex flex-col gap-1 w-full">
        <div className="w-full flex">
          <div
            ref={textRef}
            className={
              viewAllContent
                ? "flex flex-col gap-1 w-full"
                : "flex overflow-hidden whitespace-nowrap text-ellipsis"
            }
            style={!viewAllContent ? { width: dynamicWidth } : {}}
          >
            <FormmattedDescription description={post.description} type={type} />
          </div>
          {isTextTruncated && !viewAllContent && (
            <span className="dark:text-white text-sm">...</span>
          )}
        </div>
      </div>
      {isTextTruncated && !viewAllContent && (
        <span
          onClick={() => setViewAllContent((state) => !state)}
          className="w-fit cursor-pointer font-bold text-sm dark:text-white"
        >
          <CTranslateTo eng="See more" pt="Ver mais" />
        </span>
      )}
      {viewAllContent && (
        <span
          onClick={() => setViewAllContent((state) => !state)}
          className="w-fit cursor-pointer font-bold text-sm dark:text-white"
        >
          <CTranslateTo eng="See less" pt="Ver menos" />
        </span>
      )}
    </div>
  );
}
