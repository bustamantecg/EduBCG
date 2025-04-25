import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "synthwave" : "light");
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <input
        type="checkbox"
        className="toggle theme-controller"
        onChange={toggleTheme}
        checked={theme === "synthwave"}
      />
      <span>{theme === "synthwave" ? "🌙" : "☀️"}</span>
    </label>
  );
};

export default ThemeSwitcher;
