import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./SmNav.css";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MENU } from "../actions";

const NavHamButton = (props) => {
  const state = useSelector((state) => state.menuState);
  const dispatch = useDispatch();
  const handleMenuOpen = () => {
    dispatch({ type: TOGGLE_MENU, payload: false });
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={state.opened}
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
        classNames="fade"
      >
        <button
          onClick={() => handleMenuOpen()}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200 ease-in-out"
        >
          <span className="sr-only">Open main menu</span>
          {state.opened ? (
            <div>
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
            </div>
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

const NavMenu = (props) => {
  const state = useSelector((state) => state.menuState);

  return (
    <CSSTransition
      in={state.opened}
      timeout={200}
      classNames="nav-menu"
      unmountOnExit
    >
      <div className={`sm:hidden origin-top`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button className="text-lg block text-center px-3 py-2">Home</button>
          <button className="text-lg block text-center px-3 py-2">
            Stores
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export { NavHamButton, NavMenu };
