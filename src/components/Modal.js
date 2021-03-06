import { forwardRef } from "react";

const maxWidths = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
};

const Modal = forwardRef(
  ({ children, closing, title, width, ...props }, ref) => {
    const maxWidth = maxWidths[width];
    return (
      <div
        className="fixed z-40 sm:pt-10 inset-0 overscroll-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => closing()}
            className="fixed inset-0 backdrop-filter backdrop-blur bg-gray-900 bg-opacity-50"
            aria-hidden="true"
          ></div>
          <div
            ref={ref}
            className={`inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden filter drop-shadow-3xl transform transition-all w-full ${maxWidth} my-8`}
          >
            <div className="pb-2 pt-1 flex flex-col">
              <div className="w-full mb-4 px-2">
                <span className="text-2xl text-gray-900 dark:text-gray-50 font-bold px-1">
                  {title}
                </span>
                <button
                  onClick={() => closing()}
                  className="absolute right-0 mx-1 focus:outline-none hover:bg-red-200 active:bg-red-100 hover:text-red-600 text-gray-900 dark:text-gray-50 dark:hover:bg-red-500 dark:active:bg-red-600 dark:hover:text-red-200 transition duration-500 ease-in-out rounded-xl p-1"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full px-2 pb-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Modal.defaultProps = {
  closing: () => {},
  title: "",
  width: "lg",
};

export default Modal;
