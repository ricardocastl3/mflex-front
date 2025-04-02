import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/@components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontSize: {
        fsm: "0.8rem",
        normal: "0.85rem",
      },
      colors: {
        "ausoft-slate-900": "#121924",
        "ausoft-slate-950": "#0f121c",
        "ausoft-border-dark": "#161c29",
      },
    },

    animation: {
      spin: "spin 1s linear infinite",
      pulse: "pulse 1.3s cubic-bezier(0.8, 2, 0.3, 1) infinite",
      progress: "progress 1s infinite linear",
      "waving-hand": "wave 2s linear infinite",
    },
    keyframes: {
      pulse: {
        "0%": {
          opacity: "1",
        },
        "50%": {
          opacity: "0.5",
        },
        "100%": {
          opacity: "1",
        },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      progress: {
        "0%": { transform: " translateX(0) scaleX(0)" },
        "40%": { transform: "translateX(0) scaleX(0.4)" },
        "100%": { transform: "translateX(100%) scaleX(0.5)" },
      },
      wave: {
        "0%": { transform: "rotate(0.0deg)" },
        "10%": { transform: "rotate(14deg)" },
        "20%": { transform: "rotate(-8deg)" },
        "30%": { transform: "rotate(14deg)" },
        "40%": { transform: "rotate(-4deg)" },
        "50%": { transform: "rotate(10.0deg)" },
        "60%": { transform: "rotate(0.0deg)" },
        "100%": { transform: "rotate(0.0deg)" },
      },
    },
    transformOrigin: {
      "left-right": "0% 50%",
    },
  },
  plugins: [],
};
export default config;
