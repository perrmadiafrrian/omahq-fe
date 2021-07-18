import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./NavHamButton.css";

const NavHamButton = (props) => {
  const [state, setState] = useState(true);

  return (
    <SwitchTransition>
      <CSSTransition
        key={state}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        classNames="fade"
      >
        <button
          onClick={() => setState((state) => !state)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200 ease-in-out"
        >
          <span className="sr-only">Open main menu</span>
          {state ? (
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
          ) : (
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
                d="M4 6H16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default NavHamButton;
