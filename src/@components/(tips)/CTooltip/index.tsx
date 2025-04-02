"use client"

import React, { useEffect, useRef, useState } from "react";
import CTranslateTo from "../../(translation)/CTranslateTo";

import { motion } from "framer-motion";

export default function CToolTip({
  description_en,
  description_pt,
  right = true,
  customStyle,
  body,
  width,
}: {
  body: React.ReactNode;
  description_en: string;
  description_pt: string;
  customStyle?: string;
  right?: boolean;
  width?: string;
}) {
  const [show, setShow] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
  });
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (show && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setTooltipPosition({ top: rect.top, left: rect.left, right: rect.right });
    }
  }, [show]);

  return (
    <>
      <div className="relative">
        <span
          ref={iconRef}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="cursor-pointer"
        >
          {body}
        </span>
        {show && (
          <motion.div
            style={{
              position: "fixed",
              top: `${tooltipPosition.top + 40}px`,
              left: `${right ? "auto" : `${tooltipPosition.left + 10}px`}`,
              right: `${
                right
                  ? `${window.innerWidth - tooltipPosition.right}px`
                  : "auto"
              }`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${
              width ? width : "w-[14rem]"
            }  text-xs leading-5 rounded-xl md:flex hidden order-1 z-50 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-ausoft-slate-900 text-slate-800 dark:text-slate-200 ${customStyle}`}
          >
            <CTranslateTo eng={description_en} pt={description_pt} />
          </motion.div>
        )}
      </div>
    </>
  );
}
