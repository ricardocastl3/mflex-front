"use client";

import { useAppProvider } from "@/providers/app/AppProvider";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import useDarkMode from "@/hooks/useDarkMode";

export function CSwitcherTheme() {
  const [colorTheme, setTheme] = useDarkMode();

  const [isDarkModeBySwitch, setIsDarkModeBySwitch] = useState(true);
  const { handleSetDarkMode } = useAppProvider();

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkModeBySwitch(checked);
    handleSetDarkMode(checked);
    setTheme(colorTheme);

    const theme = checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (colorTheme === "light") {
      handleSetDarkMode(true);
      setIsDarkModeBySwitch(true);
    } else {
      handleSetDarkMode(false);
      setIsDarkModeBySwitch(false);
    }
  }, [colorTheme, handleSetDarkMode]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.setAttribute(
      "data-theme",
      theme && theme != String("null") ? theme : "light"
    );
  }, []);

  return (
    <div className={`flex items-center gap-4 p-1.5 rounded-full`}>
      <div
        className={`p-2 rounded-full border dark:border-none border-slate-300 dark:bg-slate-800 bg-white`}
      >
        <DarkModeSwitch
          style={{ width: 18, height: 18 }}
          checked={isDarkModeBySwitch}
          onChange={toggleDarkMode}
          size={120}
        />
      </div>
    </div>
  );
}
