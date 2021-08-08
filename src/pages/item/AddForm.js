import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Input, InputGroup, Modal } from "../../components";
import AlertContext from "../../contexts/AlertContext";
import LoadingContext from "../../contexts/LoadingContext";
import axiosInstance from "../../utils/axiosInstance";
import { IDRFormatter } from "../../utils/CurrenyFormatter";
import errorResponseHandler from "../../utils/errorResponseHandler";

// Default value for the form
const defaultForm = {
  store: "",
  price: 0,
  quantity: "",
  total_price: "Rp 0,00",
};

/**
 * Add Item form, handling incoming item transaction
 * consist of store, price and quantity
 *
 * @param {Object} param0 Component props
 * @returns JSX.Element that should be rendered
 */
const AddForm = ({ item, shown, onClose, houseId, onSaved }) => {
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({ ...defaultForm });
  const { showAlert } = useContext(AlertContext);
  const { loadingProcess, loadingDone } = useContext(LoadingContext);
  const modalRef = useRef();
  const LOADING_ADD_FORM = "LOADING_ADD_FORM";

  //Reset the form on shown
  useEffect(() => {
    setForm(defaultForm);
  }, [shown]);

  /**
   * Handling the state changes
   *
   * @param {Event} e Input change event
   * @param {String} name form's name
   */
  const handleOnChange = (e, name) => {
    const new_form = { ...form };
    new_form[name] = e.target.value;
    new_form.price = parseInt(new_form.price);
    const total_price = new_form.price * new_form.quantity;
    new_form.total_price = IDRFormatter.format(total_price);
    setForm(new_form);
  };

  /**
   * Processing the form to be submitted
   * for the incoming transaction
   */
  const submit = async () => {
    loadingProcess(LOADING_ADD_FORM);
    await axiosInstance
      .post(`/transaction/incoming`, {
        ...form,
        barcode: item.barcode,
        user_id: auth.data.id,
        house_id: houseId,
      })
      .then(({ data }) => {
        showAlert({
          message: `Item has been added`,
          title: `Success`,
          type: `success`,
        });
        onSaved(data);
        onClose();
      })
      .catch(({ response }) => {
        errorResponseHandler(response, showAlert);
      });
    loadingDone(LOADING_ADD_FORM);
  };

  return (
    <CSSTransition
      nodeRef={modalRef}
      in={shown}
      timeout={300}
      classNames="modal-lg"
      unmountOnExit
    >
      <Modal
        ref={modalRef}
        title={<span className="text-lg">Add {item?.name}</span>}
        closing={() => onClose()}
      >
        <InputGroup label="Store">
          <Input
            placeholder="Store"
            onChange={(e) => handleOnChange(e, "store")}
            value={form.store}
          />
        </InputGroup>
        <InputGroup label="Price">
          <Input
            placeholder="Price"
            onChange={(e) => handleOnChange(e, "price")}
            value={form.price}
          />
        </InputGroup>
        <InputGroup label="Quantity">
          <Input
            placeholder="Quantity"
            onChange={(e) => handleOnChange(e, "quantity")}
            value={form.quantity}
          />
        </InputGroup>
        <InputGroup label="Total Price">
          <Input placeholder="Total Price" disabled value={form.total_price} />
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
  );
};

export default AddForm;
