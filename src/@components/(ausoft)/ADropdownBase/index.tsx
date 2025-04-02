"use client";

import { motion } from "framer-motion";
import { BaseBox } from "../../(box)/BaseBox";
import React, { useRef, useState } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import BaseModal from "@/@components/(modals)/base";

interface IDropdownBaseProps {
  DesktopContentElement?: React.ComponentType<{ callback?: () => void }>;
  DesktopContent: React.ReactNode;
  MobileContent: React.ComponentType<{ callback: () => void }>;
  trigger: React.ReactNode;
  right?: boolean;
  top?: string;
  callback?: () => void;
  onMouse?: boolean;
}

export default function ADropdownBase({
  DesktopContent,
  DesktopContentElement,
  MobileContent,
  trigger,
  right = true,
  top = "top-14",
  callback,
  onMouse = false,
}: IDropdownBaseProps) {
  const [show, setShow] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [showMobileCard, setShowMobileCard] = useState(false);

  const boxRef = useRef(null);

  useClickOutside(boxRef, () => {
    if (canShow) {
      setShow(false);
      {
        callback && callback();
      }
    }
  });

  return (
    <div className="relative">
      <div
        className="md:flex hidden"
        onClick={() => {
          setShow((state) => !state);
        }}
        onMouseEnter={() => {
          if (onMouse) {
            setShow(true);
          }
          setCanShow(false);
        }}
        onMouseLeave={() => {
          setCanShow(true);
        }}
      >
        {trigger}
      </div>
      <div
        onClick={() => {
          setShowMobileCard(true);
        }}
        className="md:hidden flex"
      >
        {trigger}
      </div>

      {show && (
        <motion.div
          onMouseEnter={() => {
            if (onMouse) setShow(true);
          }}
          onMouseLeave={() => {
            if (onMouse) setShow(false);
          }}
          ref={boxRef}
          initial={{ translateY: "0.8rem", opacity: 0.6 }}
          animate={{ translateY: "0rem", opacity: 1 }}
          className={`${
            right ? "right-0" : "left-0"
          } ${top} md:flex hidden z-40 absolute  flex-col`}
        >
          {/* <div className="text-white -top-3 dark:-z-10  z-20 right-2 dark:text-slate-800/80 flex w-full justify-end absolute">
              <ReactIcons.BiIcon.BiSolidUpArrow size={24} className="" />
            </div> */}

          <BaseBox className="p-4 shadow">
            {!DesktopContentElement && DesktopContent}

            {DesktopContentElement && (
              <DesktopContentElement
                callback={() => {
                  setCanShow(true);
                  setShow(false);
                }}
              />
            )}
          </BaseBox>
        </motion.div>
      )}
      {showMobileCard && (
        <div className="md:hidden flex">
          <BaseModal
            callbackClose={() => {
              setShowMobileCard(false);
            }}
          >
            <div className="w-[90vw] p-4">
              <MobileContent
                callback={() => {
                  setShowMobileCard(false);
                }}
              />
            </div>
          </BaseModal>
        </div>
      )}
    </div>
  );
}
