import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useDarkMode(): [
  string,
  Dispatch<SetStateAction<string>>
] {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("theme")!;
    }

    return "dark";
  });
  const colorTheme: string = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
