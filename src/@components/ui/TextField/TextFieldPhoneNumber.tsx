"use client";

import { styled } from "@/styles";
import { blue, slate } from "tailwindcss/colors";
import { PhoneInput } from "react-international-phone";
import { Dispatch, memo, SetStateAction } from "react";

let isDarkMode = "light";

if (typeof window != "undefined") {
  const htmlElement = localStorage.getItem("theme");
  isDarkMode = htmlElement as string;
}

export const PhoneStyle = styled(PhoneInput, {
  "::-webkit-scrollbar": {
    width: "$2",
  },

  "::-webkit-scrollbar-track": {
    background: isDarkMode == "light" ? slate[300] : slate[800],
  },

  "::-webkit-scrollbar-thumb": {
    background: isDarkMode == "light" ? slate[500] : slate[600],
    borderRadius: "$full",
  },

  display: "flex",
  alignItems: "center",
  gap: "$2",

  button: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "$12",
    padding: "$2",
    height: "$12",
    borderRadius: "$md",
    border: `1.8px solid ${isDarkMode == "light" ? slate[300] : slate[700]}`,
    background: isDarkMode == "light" ? slate[50] : slate[800],

    img: {
      width: "$10",
      height: "$10",
    },
  },

  ul: {
    position: "absolute",
    overflowX: "auto",
    marginTop: "$2",
    background: isDarkMode == "light" ? slate[50] : "#121924",
    border: `1.8px solid ${isDarkMode == "light" ? blue[200] : blue[950]}`,
    borderRadius: "$md",
    outline: "none",

    height: "12rem",

    img: {
      width: "$4",
      height: "$4",
    },

    li: {
      padding: "$2 $4",
      display: "flex",
      alignItems: "center",

      cursor: "pointer",
      gap: "$2",

      span: {
        color: isDarkMode == "light" ? slate[800] : slate[100],
        fontSize: "$sm",
      },

      "span + span": {
        color: isDarkMode == "light" ? slate[800] : slate[100],
        display: "block",
      },

      "&:hover": {
        background: isDarkMode == "light" ? slate[300] : slate[800],
      },
    },
  },

  input: {
    padding: "$2 $4",
    borderRadius: "$md",
    fontSize: "$sm",
    width: "100%",
    background: "transparent",
    height: "$12",
  },
});

export const TextFieldPhoneNumber = memo(function TextFieldPhoneNumber({
  setValue,
  value,
  disabled = false,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}) {
  return (
    <PhoneStyle
      onChange={(e) => setValue(e)}
      value={value}
      disabled={disabled}
      inputClassName="z-10 dark:text-white disabled:opacity-70 text-slate-800 focus:ring-1 focus:ring-blue-800/40 focus:ring-offset-blue-600 focus:ring-offset-1 border-[1.8px] border-slate-300 dark:border-slate-700/80"
    />
  );
});
