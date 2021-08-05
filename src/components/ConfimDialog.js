import { FaQuestion } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Confirmation dialog, expecting 4 props [shown, onConfirm, confirmText, onCancel]
 * which this dialog will be shown if `shown` is true with confirmation text of `confirmText`.
 * This dialog going to call `onConfirm` or `onCancel` based on the user interaction
 *
 * @param {Object} param0 Confirm dialog props
 * @returns JSX.Element to be rendered
 */
const ConfimDialog = ({ shown, onConfirm, confirmText, onCancel }) => {
  const nodeRef = useRef();

  return (
    <CSSTransition
      in={shown}
      unmountOnExit
      classNames="modal-lg"
      timeout={200}
      nodeRef={nodeRef}
    >
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div
          onClick={onCancel}
          className="absolute -z-10 inset-0 backdrop-filter backdrop-blur-sm bg-gray-500 bg-opacity-40"
        ></div>
        <div
          ref={nodeRef}
          className="bg-white shadow-xl w-full sm:w-96 rounded-lg flex justify-center items-center mx-4 py-2 px-2"
        >
          <div className="w-20 h-20 pr-4">
            <IconContext.Provider
              value={{ className: `text-yellow-400 w-full h-full` }}
            >
              <FaQuestion />
            </IconContext.Provider>
          </div>
          <div className="flex-1 flex space-y-4 flex-col">
            <span className="text-lg font-medium w-full">{confirmText}</span>
            <div className="w-full flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-2 py-1 text-gray-400 hover:text-gray-300 active:text-gray-400 focus:outline-none transition duration-300 ease-in-out font-medium"
              >
                No
              </button>
              <button
                onClick={onConfirm}
                className="px-2 py-1 text-lg bg-green-600 hover:bg-green-500 active:bg-green-700 focus:outline-none transition duration-300 rounded-lg text-white font-medium"
              >
                Sure!
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

ConfimDialog.defaultProps = {
  shown: false,
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "Confirm text not provided",
};

export default ConfimDialog;
