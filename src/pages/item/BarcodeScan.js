import { useEffect, useRef, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { CSSTransition } from "react-transition-group";
import { Input } from "../../components";

/**
 * Barcode scan component using webcam or
 * getting item barcode using barcode scanner
 *
 * @param {Object} props component props
 * @returns
 */
const BarcodeScan = ({ showScanner, onScanned }) => {
  const ref = useRef();
  const [scanner, setScanner] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  /**
   * Focusing to the input if user select
   * to use a barcode scanner
   */
  useEffect(() => {
    if (scanner) {
      inputRef.current?.focus();
      setInput("");
    }
  }, [scanner, showScanner]);

  /**
   * Handle the scan event
   */
  const handleScan = (err, result) => {
    onScanned(result);
  };

  /**
   * Handle the input change event
   *
   * @param {Event} e input change event
   */
  const handleChange = (e) => {
    setInput(e.target.value.replace(/\D/, ""));
  };

  /**
   * Handling keyboard input event to check
   * if it is an `Enter` event
   *
   * @param {Event} e keyboard event
   */
  const handleEnterPressed = (e) => {
    if (e.key === "Enter" && input.length >= 13) {
      handleScan(null, { text: input });
    }
  };

  return (
    <CSSTransition
      nodeRef={ref}
      in={showScanner}
      timeout={300}
      classNames="modal"
      unmountOnExit
    >
      <div className="fixed z-40 inset-0 flex justify-center items-center">
        <div
          onClick={() => {
            handleScan(null, null);
          }}
          className="absolute bg-gray-700 bg-opacity-30 -z-10 inset-0 backdrop-filter backdrop-blur-sm"
        ></div>
        <div className="py-3 px-2 flex flex-col space-y-6" ref={ref}>
          <button
            onClick={() => setScanner((c_value) => !c_value)}
            className="px-3 py-2 rounded-lg bg-green-500 text-lg font-semibold shadow-xl text-white hover:bg-green-400 active:bg-green-600 transition duration-300 ease-out"
          >
            {scanner ? `Use Webcam` : `Use Scanner`}
          </button>
          {scanner ? (
            <div className="rounded-lg bg-white px-4 py-2 shadow-lg w-full">
              <Input
                onKeyDown={handleEnterPressed}
                onChange={handleChange}
                value={input}
                ref={inputRef}
                pattern="[0-9]*"
              />
            </div>
          ) : (
            <div className="rounded-lg overflow-hidden">
              <BarcodeScannerComponent
                width={500}
                height={500}
                torch={false}
                delay={1000}
                onUpdate={(err, result) => {
                  if (result) {
                    handleScan(err, result);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default BarcodeScan;
