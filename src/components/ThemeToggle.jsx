import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: light)");
    function syncTheme(event) {
      let saved;
      try {
        saved = localStorage.getItem("anik-theme");
      } catch {
        /* Storage is optional. */
      }
      if (saved !== "light" && saved !== "dark")
        setTheme(event.matches ? "light" : "dark");
    }
    function syncStorage(event) {
      if (event.key === "anik-theme" || event.key === null) {
        setTheme(
          event.newValue === "light" || event.newValue === "dark"
            ? event.newValue
            : preference.matches
              ? "light"
              : "dark",
        );
      }
    }
    preference.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncStorage);
    return () => {
      preference.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#14161b" : "#f3f5f8";
  }, [theme]);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("anik-theme", next);
    } catch {
      /* Still works without persistence. */
    }
    setTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </button>
  );
}
