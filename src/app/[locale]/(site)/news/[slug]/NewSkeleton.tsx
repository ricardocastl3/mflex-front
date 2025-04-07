import React from "react";
import { BaseBox } from "@/@components/(box)/BaseBox";

export default function NewSkeleton() {
  return (
    <>
      <div className="md:mt-8 mt-4 flex flex-col">
        <div className="md:mx-10 mx-5 flex md:flex-row flex-col gap-8">
          <BaseBox className="flex-1 p-8 dark:bg-ausoft-slate-900 animate-pulse"></BaseBox>
          <div className="flex flex-col gap-4 md:w-[20rem] w-full">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <BaseBox
                  key={i}
                  className="flex-1 p-24 dark:bg-ausoft-slate-900 animate-pulse"
                ></BaseBox>
              );
            })}
          </div>
        </div>

        <div className="md:py-10 py-10 md:px-10 px-5 bg-slate-300/40 dark:bg-ausoft-slate-900">
          <div className="flex md:flex-row flex-col md:items-center items-start w-full gap-4">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <BaseBox
                  key={i}
                  className="flex-1 p-24 dark:bg-slate-800/30 animate-pulse w-full"
                ></BaseBox>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
