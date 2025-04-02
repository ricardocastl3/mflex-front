import { createStitches, defaultThemeMap } from "@stitches/react";

import {
  colors,
  fontWeights,
  fontSizes,
  radii,
  space,
  fonts,
  lineHeights,
} from "@layback-ui/tokens";

export const { styled, globalCss, prefix, keyframes } = createStitches({
  themeMap: {
    ...defaultThemeMap,
    height: "space",
    width: "space",
    margin: "space",
    padding: "space",
  },
  theme: {
    colors: {
      ...colors,
      textRose400: "#fb7185",
      textRose500: "#f43f5e",
    },
    fonts,
    fontSizes,
    lineHeights,
    space,
    radii,
    fontWeights,
  },
  media: {
    sm: "(max-width: 640px)",
    md: "(max-width: 768px)",
    lg: "(max-width: 1024px)",
  },
});
