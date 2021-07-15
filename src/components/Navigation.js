import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import GoogleSignout from "./GoogleSignout";

const Navigation = (props) => {
  const [showUMenu, setShowUMenu] = useState(false);
  return (
    <div className="w-full shadow-lg px-2 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto h-16 flex items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200 ease-in-out">
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
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
                d="M4 6H16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
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
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center"></div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <button className="text-lg text-center px-3 py-2">Home</button>
              <button className="text-lg text-center px-3 py-2">Stores</button>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ms:ml-6 sm:pr-0">
          <div className="ml-6 relative">
            <span>Permadi Afrian</span>
          </div>
          <div className="ml-2 relative">
            <div>
              <button
                onClick={() => setShowUMenu(!showUMenu)}
                onBlur={() => setShowUMenu(false)}
                className="bg-gray-800 hover:opacity-50 transition ease-in-out duration-300 flex text-sm rounded-full focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://lh3.googleusercontent.com/ogw/ADea4I4MEreOB7k5NFiJl6BChAyid8lU1w6uXM4cicijfQ=s83-c-mo"
                  alt=""
                />
              </button>
            </div>
            <CSSTransition
              in={showUMenu}
              timeout={300}
              classNames="umenu"
              unmountOnExit
            >
              <div
                className={`block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                tabIndex="-1"
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  tabIndex="-1"
                >
                  Profile
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  tabIndex="-1"
                >
                  Settings
                </button>
                <GoogleSignout />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button className="text-lg block text-center px-3 py-2">Home</button>
          <button className="text-lg block text-center px-3 py-2">
            Stores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
