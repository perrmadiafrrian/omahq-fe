import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { Alert } from "../components";

const AlertContext = createContext();

export const AlertContextProvider = forwardRef(({ children }, ref) => {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [usedAlert, setUsedAlert] = useState({
    close: () => {},
    title: ``,
    type: `question`,
    message: `What alert is this?`,
    onClose: () => {},
  });
  const [show, setShow] = useState(false);
  const alertRef = useRef(null);

  const showAlert = useCallback(
    (newAlert) => {
      setCurrentOptions((opt) => [...opt, newAlert]);
    },
    [setCurrentOptions]
  );

  const handleClose = () => {
    const newOptions = [...currentOptions];
    newOptions.shift();
    setCurrentOptions(newOptions);
    setShow(false);
  };

  useEffect(() => {
    if (currentOptions.length) {
      setUsedAlert(currentOptions[0]);
      setShow(true);
    }
  }, [currentOptions]);

  return (
    <AlertContext.Provider value={{ alertOption: currentOptions, showAlert }}>
      {children}
      <CSSTransition
        in={show}
        unmountOnExit
        timeout={200}
        classNames="alert"
        nodeRef={alertRef}
      >
        <Alert ref={alertRef} {...usedAlert} close={handleClose} />
      </CSSTransition>
    </AlertContext.Provider>
  );
});

export const AlertConsumer = AlertContext.Consumer;

export default AlertContext;
