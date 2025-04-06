import { motion } from "framer-motion";

export default function ARegisterProgress({
  isOpened,
  rounded = "none",
}: {
  isOpened: boolean;
  rounded?: "bottom" | "top" | "all" | "none";
}) {
  return (
    <>
      {isOpened && (
        <motion.div
          className={`${
            rounded === "bottom"
              ? "rounded-b-xl"
              : rounded === "top"
              ? "rounded-t-xl"
              : rounded === "all"
              ? "rounded-xl"
              : ""
          } absolute inset-y-0 inset-x-0 animate-pulse text-slate-700 dark:text-slate-400 dark:bg-slate-800/50 bg-slate-400/40`}
        >
          <div className={`"w-full h-full"`}>
            <div
              className={`${
                rounded === "bottom"
                  ? ""
                  : rounded === "top"
                  ? "rounded-t-2xl"
                  : rounded === "all"
                  ? "rounded-xl"
                  : ""
              } h-1.5 w-full bg-pink-100 overflow-hidden`}
            >
              <div className="animate-progress rounded-t-full w-full h-full bg-yellow-500 dark:bg-yellow-600 origin-left-right"></div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
