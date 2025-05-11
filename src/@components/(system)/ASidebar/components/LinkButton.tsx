import CTranslateTo from "@/@components/(translation)/CTranslateTo";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CPopever from "@/@components/(tips)/CPopover";

import { IconType } from "react-icons";
import { langByCookies } from "@/http/axios/api";

interface ILinkButton extends React.ComponentPropsWithRef<"a"> {
  href: string;
  isSelected: boolean;
  isExpanded: boolean;
  Icon: IconType;
  title_en: string;
  title_pt: string;
  isPublic?: boolean;
}

export default function LinkButton({
  isSelected,
  isExpanded,
  isPublic,
  href,
  title_en,
  title_pt,
  Icon,
  ...props
}: ILinkButton) {
  const [openPopover, setOpenPopover] = useState("none");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (openPopover !== "none" && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPopoverPosition({ top: rect.top, left: rect.left });
    }
  }, [openPopover]);

  return (
    <Link
      onMouseOver={() => setOpenPopover(href)}
      onMouseOut={() => setOpenPopover("none")}
      {...props}
      href={`/${langByCookies}/${
        isPublic ? `${href}` : `${href == "" ? "app" : `app/${href}`}`
      }`}
      className={`${
        isSelected
          ? "bg-yellow-100/50 dark:bg-yellow-800/10"
          : "hover:bg-yellow-100/50 dark:hover:bg-yellow-800/10"
      } ${
        isExpanded ? "" : "w-fit"
      }  text-nowrap transition-all flex items-center gap-2 px-2 py-1.5 text-normal rounded-full text-slate-800 dark:text-white`}
    >
      <span
        ref={iconRef}
        className={`${
          isSelected
            ? "bg-yellow-600 text-white"
            : "bg-slate-200 dark:bg-slate-800/80 hover:bg-yellow-600 hover:dark:bg-yellow-600 hover:text-white"
        } relative w-fit p-2 rounded-full flex`}
      >
        <Icon size={15} />
        {!isExpanded && openPopover == href && (
          <CPopever
            title_en={title_en}
            title_pt={title_pt}
            left={popoverPosition.left + 45}
            top={popoverPosition.top + 2}
          />
        )}
      </span>
      {isExpanded && (
        <h4 className="mt-0.5">
          <CTranslateTo eng={title_en} pt={title_pt} />
        </h4>
      )}
    </Link>
  );
}
