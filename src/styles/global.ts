import { globalCss } from ".";

export const GlobalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    scrollBehavior: "smooth",
    fontSmooth: "never",
  },

  ".scrollbar-hide": {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  },
  ".scrollbar-hide::-webkit-scrollbar": {
    display: "none", // Chrome, Safari, Opera
  },

  "::-webkit-scrollbar": {
    width: "4px",
    height: "0px",
    "@sm": {
      height: "2px",
    },
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "8px",
    height: "0px",
  },

  '[data-theme="dark"] ::-webkit-scrollbar-thumb': {
    background: "#1e293b", // slate[800]
  },
  '[data-theme="light"] ::-webkit-scrollbar-thumb': {
    background: "#e2e8f0", // slate[200]
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
