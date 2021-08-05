import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_DARKMODE } from "../actions";

const DarkMode = () => {
  const menuState = useSelector((state) => state.menuState);
  const dispatch = useDispatch();

  /**
   * Handle the toggle action for `dark mode`.
   *
   * @param {Event} e click event
   */
  const handleToggle = (e) => {
    dispatch({ type: TOGGLE_DARKMODE });
  };

  return (
    <div
      onClick={handleToggle}
      className={`rounded-full text-xs active:bg-gray-50 cursor-pointer  w-10 border-2 border-gray-200 dark:border-gray-500 flex ${
        menuState.dark_mode
          ? "flex-row-reverse bg-gray-500"
          : "flex-row bg-gray-200"
      } justify-between hover:bg-gray-400 transition duration-300`}
    >
      {menuState.dark_mode ? `🌑` : `☀️`}
    </div>
  );
};

export default DarkMode;
