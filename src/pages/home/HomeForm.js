import { CSSTransition } from "react-transition-group";
import { Modal, Input, InputGroup } from "../../components";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import errorResponseHandler from "../../utils/errorResponseHandler";

/**
 * Form for editing or creating new house data
 * which gonna show a modal consisting of an
 * input for house's name
 *
 * @param {Object} props form property
 * @returns Form component to be rendered
 */
const HomeForm = ({
  showModal,
  setShowModal,
  editId,
  houseName,
  cleanOnOpen,
  setHouses,
  addAlert,
  onClose,
}) => {
  const modalRef = useRef(null);
  const inputRef = useRef();
  const [nameValue, setNameValue] = useState(houseName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requiredFail, setRequiredFail] = useState(false);
  const auth = useSelector((state) => state.auth);

  /**
   * On modal showing, its going to check
   * if input should be cleared and check
   * if the house name is available, set
   * the input to the house name if it is
   * available
   */
  useEffect(() => {
    if (cleanOnOpen) setNameValue("");
    if (houseName) setNameValue(houseName);
    setRequiredFail(false);
  }, [showModal, cleanOnOpen, houseName]);

  /**
   * Focusing to the input on modal shown
   */
  useEffect(() => {
    if (showModal) inputRef?.current?.focus();
  }, [showModal, inputRef]);

  /**
   * Set the name state based on the input
   * changes
   *
   * @param {Event} e input change event
   */
  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  /**
   * Handling the submit event for the form
   * checking if the form is an edit form
   * or a new form
   *
   * @returns boolean
   */
  const handleSubmitData = async () => {
    if (nameValue === "" || nameValue === undefined) {
      setRequiredFail(true);
      return false;
    }

    setIsProcessing(true);

    if (editId) {
      await axiosInstance
        .patch(`/house/${editId}`, {
          name: nameValue,
        })
        .then((res) => {
          setHouses((houses) => {
            const newHouses = [...houses];
            newHouses.map((v, i) => {
              if (v.id === editId) v.name = nameValue;
              return v;
            });
            return newHouses;
          });
          addAlert({
            message: `${res.data.name} has been successfully saved`,
            title: `Success`,
            type: "success",
          });
        })
        .catch((err) => {
          if (err.response) {
            errorResponseHandler(err.response, addAlert);
          } else console.log(err);
        })
        .finally(() => {
          setIsProcessing(false);
          setShowModal(false);
          onClose();
        });
    } else {
      await axiosInstance
        .post(`/house`, {
          name: nameValue,
          owner_id: auth.data.id,
        })
        .then((res) => {
          res.data.edit = false;
          setHouses((houses) => [...houses, res.data]);
          addAlert({
            message: `${res.data.name} has been successfully saved`,
            title: `Success`,
            type: "success",
          });
        })
        .catch((err) => {
          if (err.response) {
            errorResponseHandler(err.response, addAlert);
          } else console.log(err);
        })
        .finally(() => {
          setIsProcessing(false);
          setShowModal(false);
          onClose();
        });
    }

    return true;
  };

  /**
   * Handle the modal closing event, modal going
   * to be closed if the form is not in processing
   */
  const handleModalClosing = () => {
    if (!isProcessing) {
      setShowModal(false);
      onClose();
    }
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={300}
      unmountOnExit
      nodeRef={modalRef}
      classNames="modal"
    >
      <Modal
        width="sm"
        ref={modalRef}
        closing={handleModalClosing}
        title={editId ? `Edit House` : `New House`}
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
                className={`px-2 py-1 rounded font-medium duration-300 ease-in-out focus:outline-none
                text-white bg-green-400 hover:bg-green-300 active:bg-green-500`}
              >
                Save
              </button>
            ) : (
              <button
                className={`px-2 py-1 inline-flex items-center font-medium rounded duration-300 ease-in-out focus:outline-none
              text-white bg-green-400 hover:bg-green-300 active:bg-green-500`}
              >
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

//Setting the default props for the form
HomeForm.defaultProps = {
  setShowModal: () => {},
  showModal: false,
  houseName: "",
  editId: null,
  onClose: () => {},
  addAlert: () => {},
};

export default HomeForm;
