"use client";

import { IToast, useAppProvider } from "@/providers/app/AppProvider";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ReactIcons } from "@/utils/icons";

export default function CToastify({
  position,
  toast,
  index,
}: {
  index: number;
  toast: IToast;
  position:
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}) {
  const { handleResetToast } = useAppProvider();

  useEffect(() => {
    setTimeout(() => {
      handleResetToast(toast.id!);
    }, index * 1000 + 4200);
  }, []);

  return (
    <motion.div
      initial={{
        translateY:
          position == "top-right" || position == "top-center"
            ? "-5rem"
            : "5rem",
      }}
      animate={{ translateY: 0 }}
      style={{
        position: "fixed",
        zIndex: 50,
        top:
          position == "top-center" || position == "top-right"
            ? `${index == 1 ? index * 3 : index * 5}rem`
            : undefined,
        bottom:
          position == "bottom-center" ||
          position == "bottom-right" ||
          position == "bottom-left"
            ? `${index == 1 ? index * 3 : index * 5}rem`
            : undefined,
      }}
      className={`${
        position == "top-right"
          ? `md:right-8 right-4`
          : position == "top-center"
          ? "inset-x-0"
          : position == "bottom-left"
          ? "md:left-8 left-0"
          : position == "bottom-right"
          ? "md:right-8 right-4"
          : position == "bottom-center"
          ? "inset-x-0 w-full flex justify-center"
          : ""
      }`}
    >
      <div
        className={`${
          toast?.type == "error"
            ? "border-l-red-500 dark:border-l-red-500"
            : toast?.type == "success"
            ? "border-l-green-500 dark:border-l-green-500"
            : toast.type == "info"
            ? "border-l-blue-500 dark:border-l-blue-500"
            : ""
        } bg-white border-2 dark:border-ausoft-border-dark dark:bg-ausoft-slate-950 z-50 md:w-[30vw] w-[90vw] px-6 py-4 rounded-xl flex items-start justify-between `}
      >
        <div className="flex items-start gap-4">
          {toast?.type == "success" && (
            <span className="p-0.5 rounded-full bg-green-600">
              <ReactIcons.PiIcon.PiCheck className="text-white" size={15} />
            </span>
          )}
          {toast?.type == "info" && (
            <span className="px-2 text-normal font-bold rounded-full bg-blue-600 text-white">
              !
            </span>
          )}
          {toast?.type == "error" && (
            <span className="px-2 text-normal font-bold rounded-full bg-red-600 text-white">
              !
            </span>
          )}
          <div className="flex flex-col gap-1.5">
            <h3
              className={`dark:text-slate-200 font-bold text-slate-800 text-sm`}
            >
              {toast?.title}
            </h3>
            <h3
              className={` dark:text-slate-400 font-light text-slate-600 text-sm`}
            >
              {toast?.description}
            </h3>
          </div>
        </div>
        <button
          onClick={() => handleResetToast(toast.id!)}
          className={`text-slate-800 dark:text-white p-2 hover:opacity-20 text-opacity-100 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600`}
        >
          <ReactIcons.PiIcon.PiX size={15} />
        </button>
      </div>
    </motion.div>
  );
}
