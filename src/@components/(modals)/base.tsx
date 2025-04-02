"use client";

import { useState } from "react";
import { BaseBox } from "../(box)/BaseBox";
import { motion } from "framer-motion";

export default function BaseModal({
  children,
  callbackClose,
  customSpace,
  customDesktop,
}: {
  children: React.ReactNode;
  callbackClose: () => void;
  customSpace?: string;
  customDesktop?: string;
}) {
  const [canClose, setCanClose] = useState(false);
  const [canCloseOnMobile, setCanCloseOnMobile] = useState(false);

  /** Evite fragmentation error when have hook-form */
  if (window.innerWidth >= 768) {
    return (
      <div
        /*
        onClick={() => {
          if (canClose) {
            callbackClose();
          }
        }}*/
        className={`${
          customDesktop ? customDesktop : "pt-14 pb-14"
        } md:flex hidden fixed inset-0 z-40 min-h-screen overflow-y-auto justify-center items-center backdrop-blur-sm backdrop-filter bg-slate-300/50 dark:bg-ausoft-slate-900/90`}
      >
        <motion.div
          onClick={() => setCanClose(false)}
          onMouseEnter={() => setCanClose(false)}
          onMouseLeave={() => setCanClose(true)}
          // initial={{ opacity: 0, scale: 0.85 }}
          //animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, translateY: "3rem" }}
          animate={{ opacity: 1, translateY: "0rem" }}
        >
          <BaseBox>{children}</BaseBox>
        </motion.div>
      </div>
    );
  }

  if (window.innerWidth <= 750) {
    return (
      <div
        /*
        onClick={() => {
          if (canCloseOnMobile) {
            callbackClose();
          }
        }}
          */
        className={`${
          customSpace ? customSpace : ""
        }  md:hidden flex fixed inset-0 z-40 min-h-screen overflow-y-auto justify-center items-center backdrop-blur-sm backdrop-filter bg-slate-300/50 dark:bg-ausoft-slate-900/90`}
      >
        <motion.div
          onClick={() => setCanCloseOnMobile(false)}
          onMouseEnter={() => setCanCloseOnMobile(false)}
          onMouseLeave={() => setCanCloseOnMobile(true)}
          // initial={{ opacity: 0, scale: 0.85 }}
          //animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, translateY: "3rem" }}
          animate={{ opacity: 1, translateY: "0rem" }}
        >
          <BaseBox>{children}</BaseBox>
        </motion.div>
      </div>
    );
  }
}
