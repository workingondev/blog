"use client";

import { useSyncExternalStore } from "react";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const isNight = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  function toggleTheme() {
    const nextIsNight = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextIsNight);
    try {
      localStorage.setItem("theme", nextIsNight ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event("themechange"));
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
