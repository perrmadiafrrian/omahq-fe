import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./NavHamButton.css";
import { useDispatch, useSelector } from "react-redux";

const NavHamButton = (props) => {
  const state = useSelector((state) => {
    return state.menuState;
  });
  const dispatch = useDispatch();
  const handleMenuOpen = () => {
    dispatch({ type: "TOGGLE_MENU", payload: false });
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

export default NavHamButton;
