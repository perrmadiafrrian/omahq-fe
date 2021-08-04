import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Input, InputGroup, Modal } from "../../components";
import AlertContext from "../../contexts/AlertContext";
import axiosInstance from "../../utils/axiosInstance";
import { IDRFormatter } from "../../utils/CurrenyFormatter";
import errorResponseHandler from "../../utils/errorResponseHandler";

const defaultForm = {
  store: "",
  price: 0,
  unformatted_price: 0,
  quantity: "",
  total_price: "Rp 0,00",
};

const AddForm = ({ item, shown, onClose, houseId, onSaved }) => {
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({ ...defaultForm });
  const { showAlert } = useContext(AlertContext);
  const modalRef = useRef();

  useEffect(() => {
    setForm(defaultForm);
  }, [shown]);

  const handleOnChange = (e, name) => {
    const new_form = { ...form };
    new_form[name] = e.target.value;
    const total_price = new_form.price * new_form.quantity;
    new_form.total_price = IDRFormatter.format(total_price);
    setForm(new_form);
  };

  const submit = async () => {
    //TODO: LOADING STATE
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
