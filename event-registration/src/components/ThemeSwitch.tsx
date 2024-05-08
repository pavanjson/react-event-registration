import { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "../context/themeContext";
import "../index.css";
const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <DarkModeSwitch
      className="theme-switch"
      checked={theme === "light" ? false : true}
      onChange={toggleTheme}
      size={30}
    />
  );
};
export default ThemeSwitch;
