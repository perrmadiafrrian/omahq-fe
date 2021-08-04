import { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Input, InputGroup, Modal } from "../../components";
import TextArea from "../../components/TextArea";
import AlertContext from "../../contexts/AlertContext";
import axiosInstance from "../../utils/axiosInstance";
import errorResponseHandler from "../../utils/errorResponseHandler";

// Default value for the form
const defaultForm = {
  name: null,
  description: null,
  image: null,
  quantity: 0,
};

/**
 * Pop-up modal for the new item that not yet registered
 * based on barcode
 *
 * @param {Object} props Component props
 * @returns JSX.Element to be rendered
 */
const NewItem = ({ shown, barcode, onSubmit, onClose, houseId }) => {
  const modalRef = useRef();
  const inputRef = useRef();
  const { showAlert } = useContext(AlertContext);
  const [form, setForm] = useState({
    ...defaultForm,
  });
  const [valid, setValid] = useState({
    name: true,
    description: true,
    image: true,
  });

  /**
   * Handling the value change based on input
   *
   * @param {Event} e input change event
   * @param {String} type form type/name
   */
  const handleChange = (e, type) => {
    if (e.target.validity.valid)
      setForm((c_state) => {
        c_state[type] = e.target.value;
        return c_state;
      });
    else
      setValid((c_valid) => {
        c_valid[type] = false;
        return c_valid;
      });
  };

  /**
   * Handle the submit event for the form
   * then close the form if it succeed, or
   * showing alert about the failure
   */
  const submit = async () => {
    //TODO: LOADING STATE
    await axiosInstance
      .post(`/item`, {
        ...form,
        house_id: houseId,
        barcode,
      })
      .then(({ data }) => {
        showAlert({
          message: `Item ${data.name} successfully saved`,
          title: "Success",
          type: "success",
        });
        onClose(data);
      })
      .catch(({ response }) => {
        errorResponseHandler(response, showAlert);
      });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [shown]);

  return (
    <div>
      <CSSTransition
        nodeRef={modalRef}
        in={shown}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        <Modal title="New Item" ref={modalRef} closing={onClose}>
          <InputGroup label={`Item Name`}>
            <Input
              ref={inputRef}
              onChange={(e) => handleChange(e, "name")}
              placeholder={`Item Name`}
            />
          </InputGroup>
          <InputGroup label={`Item Description`}>
            <TextArea
              onChange={(e) => handleChange(e, "description")}
              placeholder={`Item Description`}
            />
          </InputGroup>
          <InputGroup label={`Item Image`}>
            <Input
              onChange={(e) => handleChange(e, "image")}
              placeholder={`Item Image`}
              pattern="https?://.+"
              requiredFail={!valid.image}
            />
          </InputGroup>
          <InputGroup>
            <button
              onClick={submit}
              className="rounded text-white font-medium px-2 py-1 focus:outline-none hover:bg-green-500 bg-green-400 active:bg-green-600 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </InputGroup>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default NewItem;
