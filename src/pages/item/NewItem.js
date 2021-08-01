import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Modal } from "../../components";

const NewItem = ({ shown, barcode, onSubmit, onClose }) => {
  const modalRef = useRef();

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
          <div className="text-lg">{barcode}</div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default NewItem;
