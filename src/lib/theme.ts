import useApp from "../hooks/useApp";

export const applyTheme = (theme: "light" | "dark") => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

export const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const setupSystemThemeListener = () => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", () => {
    const store = useApp.getState();

    if (store.theme === "system") {
      const theme = getSystemTheme();
      store.setTheme("system");
      applyTheme(theme);
    }
  });
};
