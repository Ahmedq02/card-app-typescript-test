interface Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function DarkSwitch({ toggleDarkMode, darkMode }: Props) {
  return (
    <button
      className="m-3 absolute right-4 p-4 text-xl bg-gray-400 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md font-medium text-white"
      onClick={toggleDarkMode}
    >
      {darkMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
