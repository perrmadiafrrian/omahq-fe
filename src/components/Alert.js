import { forwardRef, useEffect, useRef, useState } from "react";
import { FaCheck, FaInfo, FaQuestion, FaExclamation } from "react-icons/fa";
import { IconContext } from "react-icons";
import { CSSTransition } from "react-transition-group";

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

const Alert = forwardRef(({ message, close, onClose, title, type }, ref) => {
  const UsedIcon = icons[type] ?? false;
  const used_color = colors[type];
  const [iconState, setIconState] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIconState(true);
    }, 200);
  }, [iconState]);

  const handleClosing = () => {
    close();
    onClose();
  };

  return (
    <div
      onClick={handleClosing}
      className="absolute inset-0 bg-gray-500 bg-opacity-20 backdrop-filter backdrop-blur-sm flex z-50 justify-center items-start"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={ref}
        className="bg-white w-full mx-4 sm:w-96 h-32 rounded-xl shadow-xl my-20 flex overflow-hidden"
      >
        <div className="place-self-center mx-4">
          <div className="w-20 h-20">
            <CSSTransition
              in={iconState}
              timeout={300}
              unmountOnExit
              classNames="alert-icon"
            >
              <div ref={iconRef}>
                {UsedIcon ? (
                  <IconContext.Provider
                    value={{ className: `${used_color} w-full h-full` }}
                  >
                    <UsedIcon />
                  </IconContext.Provider>
                ) : undefined}
              </div>
            </CSSTransition>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start m-2 space-y-4">
          <div className="text-lg text-gray-600 font-medium">{title}</div>
          <div className="text-xl text-gray-800 font-bold">{message}</div>
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
  onClose: () => {},
};

export default Alert;
