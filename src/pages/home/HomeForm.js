import { CSSTransition } from "react-transition-group";
import { Modal, Input, InputGroup } from "../../components";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const HomeForm = ({
  showModal,
  setShowModal,
  editId,
  houseName,
  cleanOnOpen,
  setHouses,
  houses,
  ...props
}) => {
  const modalNewRef = useRef(null);
  const inputRef = useRef(null);
  const [nameValue, setNameValue] = useState(houseName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requiredFail, setRequiredFail] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (cleanOnOpen) setNameValue("");
    setRequiredFail(false);
  }, [showModal, cleanOnOpen]);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleSubmitData = async () => {
    if (nameValue === "" || nameValue === undefined) {
      setRequiredFail(true);
      return;
    }

    setIsProcessing(true);

    if (editId) {
      //TODO: Handle Edit
    } else {
      await axiosInstance
        .post(`/house`, {
          name: nameValue,
          owner_id: auth.data.id,
        })
        .then((res) => {
          setHouses((houses) => [...houses, res.data]);
        })
        .finally(() => {
          setIsProcessing(false);
          setShowModal(false);
        });
    }
  };

  const handleModalClosing = () => {
    if (!isProcessing) {
      setShowModal(false);
    }
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={300}
      unmountOnExit
      nodeRef={modalNewRef}
      classNames="modal"
    >
      <Modal
        width="sm"
        ref={modalNewRef}
        closing={handleModalClosing}
        title={`New House`}
      >
        <div className="flex flex-col px-1">
          <InputGroup label="House Name">
            <Input
              ref={inputRef}
              requiredFail={requiredFail}
              placeholder="House Name"
              disabled={isProcessing}
              onChange={handleNameChange}
              value={nameValue}
            />
          </InputGroup>
          <div className="flex justify-end">
            {!isProcessing ? (
              <button
                onClick={handleSubmitData}
                className="px-2 py-1 rounded text-white font-medium bg-green-400 hover:bg-green-300 active:bg-green-500 duration-300 ease-in-out focus:outline-none"
              >
                Save
              </button>
            ) : (
              <button className="px-2 py-1 inline-flex items-center font-medium text-white rounded bg-green-400 hover:bg-green-300 active:bg-green-500 duration-300 ease-in-out focus:outline-none">
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing
              </button>
            )}
          </div>
        </div>
      </Modal>
    </CSSTransition>
  );
};

HomeForm.defaultProps = {
  setShowModal: () => {},
  showModal: false,
  houseName: "",
  editId: null,
};

export default HomeForm;
