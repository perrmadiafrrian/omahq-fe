import Navigation from "../components/Navigation";
import Modal from "../components/Modal";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const ItemPage = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="flex flex-col">
        <div className="pt-6 pb-4 mb-4 bg-indigo-50 px-6 w-full flex justify-between shadow">
          <div className="px-6 md:px-16 text-2xl font-bold">House 1 -</div>
          <div className="px-6 md:px-16">
            <button className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out text-center rounded-lg text-sm py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-center space-y-6 md:space-y-0 md:space-x-6 items-center">
          <div className="w-80 h-36 relative overflow-hidden bg-white shadow-md rounded-2xl flex justify-items-center">
            <div className="w-36 h-full bg-gray-500 rounded-l-xl mr-2 overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-1520013573795-38516d2661e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1107&q=80`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-xl max-w-10 flex flex-col justify-between h-full">
              <span className="text-lg font-bold">OralB ABCDEFG</span>
              <span className="text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                dolore itaque.
              </span>
              <span className="text-sm pb-2">Rp. 999 100</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="absolute opacity-0 hover:opacity-40 duration-500 ease-in-out flex justify-center items-center bg-gray-500 w-full h-full z-10"
            >
              <span className="text-5xl font-bold">...</span>
            </button>
          </div>
          <div className="w-80 h-36 relative overflow-hidden bg-white shadow-md rounded-2xl flex justify-items-center">
            <div className="w-36 h-full bg-gray-500 rounded-l-xl mr-2 overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-1520013573795-38516d2661e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1107&q=80`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-xl max-w-10 flex flex-col justify-between h-full">
              <span className="text-lg font-bold">OralB ABCDEFG</span>
              <span className="text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                dolore itaque.
              </span>
              <span className="text-sm pb-2">Rp. 999 100</span>
            </div>
            <button className="absolute opacity-0 hover:opacity-40 duration-500 ease-in-out flex justify-center items-center bg-gray-500 w-full h-full z-10">
              <span className="text-5xl font-bold">...</span>
            </button>
          </div>
        </div>
      </div>
      <CSSTransition
        in={showModal}
        timeout={300}
        unmountOnExit
        classNames="modal"
      >
        <Modal closing={() => setShowModal(false)}>
          <div className="h-10 text-center">
            <div className="text-2xl">TESTINg</div>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default ItemPage;
