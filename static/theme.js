// Runs before the first paint. Storage may be blocked in private browsing.
(function () {
  var theme;
  try {
    theme = localStorage.getItem("anik-theme");
  } catch {
    /* Use system preference. */
  }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#14161b" : "#f3f5f8";
})();
