import { NavLink } from "react-router-dom";
import DarkSwitch from "./DarkSwitch";

interface Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function NavBar({ toggleDarkMode, darkMode }: Props) {
  return (
    <nav className="flex justify-center gap-5">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={"/"}>
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <DarkSwitch toggleDarkMode={toggleDarkMode} darkMode={darkMode}></DarkSwitch>
    </nav>
  );
}
