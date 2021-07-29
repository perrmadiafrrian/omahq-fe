import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import GoogleSignout from "./GoogleSignout";
import "./NavProfile.css";

const NavProfile = (props) => {
  const [showUMenu, setShowUMenu] = useState(false);
  const [transitionRunning, setTransitionRunning] = useState(false);

  const nodeRef = useRef(null);
  const handleBlur = (e) => {
    if (!transitionRunning) setShowUMenu(false);
  };
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ms:ml-6 sm:pr-0">
      <div className="ml-6 relative">
        <button className="hover:text-gray-400 text-black transition-colors duration-300 ease-in-out">
          Permadi Afrian
        </button>
      </div>
      <div className="ml-2 relative z-30">
        <div>
          <button
            onClick={() => {
              if (!transitionRunning) setShowUMenu(!showUMenu);
            }}
            className="bg-gray-800 hover:opacity-50 transition ease-in-out duration-300 flex text-sm rounded-full focus:outline-none"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://lh3.googleusercontent.com/ogw/ADea4I4MEreOB7k5NFiJl6BChAyid8lU1w6uXM4cicijfQ=s83-c-mo"
              alt=""
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
        <CSSTransition
          in={showUMenu}
          timeout={300}
          classNames="umenu"
          onEnter={() => setTransitionRunning(true)}
          onEntered={() => setTransitionRunning(false)}
          onExit={() => setTransitionRunning(true)}
          onExited={() => setTransitionRunning(false)}
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <div
              onClick={() => handleBlur()}
              className="fixed inset-0"
              aria-hidden="true"
            ></div>
            <div
              className={`block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              tabIndex="-1"
            >
              <button
                className="block w-full text-left hover:text-gray-400 transition-colors ease-in-out px-4 py-2 text-sm text-gray-700"
                tabIndex="-1"
              >
                Profile
              </button>
              <button
                className="block w-full text-left hover:text-gray-400 transition-colors ease-in-out px-4 py-2 text-sm text-gray-700"
                tabIndex="-1"
              >
                Settings
              </button>
              <GoogleSignout />
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default NavProfile;
