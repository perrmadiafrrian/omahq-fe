import { forwardRef } from "react";
import { FaCheck, FaInfo, FaQuestion, FaExclamation } from "react-icons/fa";
import { IconContext } from "react-icons";

const icons = {
  success: FaCheck,
  info: FaInfo,
  question: FaQuestion,
  fail: FaExclamation,
};

const colors = {
  success: "text-green-300",
  info: "text-green-300",
  question: "text-yellow-300",
  fail: "text-red-300",
};

const Alert = forwardRef(({ message, close, title, type, ...props }, ref) => {
  const UsedIcon = icons[type] ?? false;
  const used_color = colors[type];

  return (
    <div
      onClick={close}
      className="absolute inset-0 bg-gray-500 bg-opacity-20 backdrop-filter backdrop-blur-sm flex z-50 justify-center items-start"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={ref}
        className="bg-white w-full mx-4 sm:w-96 h-32 rounded-xl shadow-xl my-20 flex overflow-hidden"
      >
        <div className="place-self-center mx-4">
          {UsedIcon ? (
            <IconContext.Provider
              value={{ className: `animate-pulse ${used_color} w-20 h-20` }}
            >
              <UsedIcon />
            </IconContext.Provider>
          ) : undefined}
        </div>
        <div className="flex-1 flex flex-col items-start m-2 space-y-4">
          <div className="text-lg font-medium">{title}</div>
          <div className="text-xl font-bold">{message}</div>
        </div>
      </div>
    </div>
  );
});

Alert.defaultProps = {
  close: () => {},
  title: ``,
  type: `question`,
  message: `What alert is this?`,
};

export default Alert;
