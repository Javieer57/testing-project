import { useState, useEffect } from "react";
import { Logo } from "./components/Logo";

export const ThemeBar = () => {
  const [theme, setTheme] = useState<"dark" | "">("");

  useEffect(() => {
    const prefersDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const initialTheme = prefersDark ? "dark" : "";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleClick = () => {
    const newTheme = theme === "dark" ? "" : "dark";
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  return (
    <section className="mx-auto max-w-[75.625rem] px-5">
      <div className="bg-neutral-0 dark:text-neutral-0 flex items-center justify-between rounded-2xl border border-neutral-300 px-3.5 py-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
        <Logo />

        <button
          className="flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-700"
          onClick={handleClick}
        >
          <img
            src={`/images/${theme === "dark" ? "icon-sun.svg" : "icon-moon.svg"}`}
            alt=""
          />
          <span className="sr-only">
            {theme === "dark" ? "Change to light mode" : "Change to dark mode"}
          </span>
        </button>
      </div>
    </section>
  );
};
