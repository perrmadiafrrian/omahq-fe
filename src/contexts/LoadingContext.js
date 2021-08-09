import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Lottie from "@rookino/react-lottie-light";
import animationData from "../animations/69529-loading.json";
const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [show, setShow] = useState(false);
  const loadingRef = useRef(null);

  const loadingProcess = useCallback(
    (data) => {
      setCurrentOptions((current_state) => [
        ...current_state.filter((v) => v !== data),
        data,
      ]);
    },
    [setCurrentOptions]
  );

  const loadingDone = useCallback(
    (data) => {
      setCurrentOptions((current_state) => [
        ...current_state.filter((v) => v !== data),
      ]);
    },
    [setCurrentOptions]
  );

  useEffect(() => {
    if (currentOptions.length) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [currentOptions]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <LoadingContext.Provider
      value={{ alertOption: currentOptions, loadingProcess, loadingDone }}
    >
      {children}
      <CSSTransition
        in={show}
        unmountOnExit
        timeout={100}
        classNames="loading"
        nodeRef={loadingRef}
      >
        <div className="fixed z-50 inset-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-70"></div>
          <div className="w-64 h-64" ref={loadingRef}>
            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
          </div>
        </div>
      </CSSTransition>
    </LoadingContext.Provider>
  );
};

export const LoadingConsumer = LoadingContext.Consumer;

export default LoadingContext;
