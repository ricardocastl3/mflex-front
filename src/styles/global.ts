import { globalCss } from ".";
import { slate } from "tailwindcss/colors";

let isDarkMode = "light";

if (typeof window != "undefined") {
  const htmlElement = localStorage.getItem("theme")
  isDarkMode = htmlElement as string;
}

export const GlobalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    scrollBehavior: "smooth",
    fontSmooth: "never",
  },

  "::-webkit-scrollbar": {
    width: "4px",
    height: "0px",
    "@sm": {
      height: "2px",
    },
  },

  "::-webkit-scrollbar-thumb": {
    background: isDarkMode == "dark" ? slate[800] : slate[200],
    borderRadius: "8px",
    height: "0px",
  },

  ":focus": {
    outline: "none",
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
  },

  "@sm": {
    "::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
});
