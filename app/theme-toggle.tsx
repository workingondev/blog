"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [isNight, setIsNight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  function toggleTheme() {
    const nextIsNight = !isNight;

    document.documentElement.classList.toggle("dark", nextIsNight);
    setIsNight(nextIsNight);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isNight ? "day" : "night"} theme`}
      aria-pressed={isNight}
      className="theme-toggle -m-2 justify-self-end p-2 text-[0.9375rem] leading-none text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-50"
    >
      {isNight ? "night" : "day"}
    </button>
  );
}
