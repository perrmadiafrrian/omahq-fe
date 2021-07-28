import { createContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Alert } from "../components";

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [usedAlert, setUsedAlert] = useState({
    close: () => {},
    title: ``,
    type: `question`,
    message: `What alert is this?`,
    onClose: () => {},
  });
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const showAlert = (newAlert) => {
    setCurrentOptions([...currentOptions, ...newAlert]);
  };

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
        nodeRef={ref}
      >
        <Alert ref={ref} {...usedAlert} close={handleClose} />
      </CSSTransition>
    </AlertContext.Provider>
  );
};

export const AlertConsumer = AlertContext.Consumer;

export default AlertContext;
