import Navigation from "../components/Navigation";
import Modal from "../components/Modal";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ItemPage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [house, setHouse] = useState({});
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const nodeRef = useRef(null);

  useEffect(() => {
    const getHouseData = async () => {
      await axiosInstance
        .get(`/house/${id}`)
        .then((res) => {
          setHouse(res.data);
        })
        .catch((err) => console.log(err));
    };
    const getItemsData = async () => {
      await axiosInstance
        .get(`/item?house=${id}`)
        .then((res) => {
          setItems(res.data.items);
          console.log(res.data.items);
        })
        .catch((err) => console.log(err));
    };
    getHouseData();
    getItemsData();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="flex flex-col">
        <div className="pt-6 pb-4 mb-4 bg-indigo-50 px-6 w-full flex justify-between shadow">
          <div className="px-6 md:px-16 text-2xl font-bold">{house?.name}</div>
          <div className="px-6 md:px-16">
            <button className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out text-center rounded-lg text-sm py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-center space-y-6 md:space-y-0 md:space-x-6 items-center">
          {items.map((v, i) => (
            <div
              key={i}
              className="w-80 h-36 relative overflow-hidden bg-white shadow-md rounded-2xl flex justify-items-center"
            >
              <div className="w-36 h-full bg-gray-500 rounded-l-xl mr-2 overflow-hidden">
                <img
                  src={v.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-xl max-w-10 flex flex-col justify-between h-full">
                <span className="text-lg font-bold">{v.description}</span>
                <span className="text-sm mb-3">{v.barcode}</span>
                <span className="text-sm pb-2">{`${v.quantity} pcs`}</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="absolute opacity-0 hover:opacity-40 duration-500 ease-in-out flex justify-center items-center bg-gray-500 w-full h-full z-10"
              >
                <span className="text-5xl font-bold">...</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <CSSTransition
        in={showModal}
        timeout={300}
        unmountOnExit
        nodeRef={nodeRef}
        classNames="modal"
      >
        <Modal ref={nodeRef} closing={() => setShowModal(false)}>
          <div className="flex flex-col px-1">
            <div className="flex flex-row space-x-2">
              <div className="w-24 h-36 sm:w-36 sm:h-36 bg-gray-500 rounded-xl mr-2 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1520013573795-38516d2661e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1107&q=80`}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-sm font-semibold">098765432123</div>
                <div className="text-xs flex-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Inventore sunt, iusto et dolorum.
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div className="text-base">10 pcs</div>
                  <div className="space-x-2">
                    <button className="px-2 py-1 bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-100 transition duration-300 focus:outline-none text-sm rounded-lg">
                      Take 1
                    </button>
                    <button className="px-2 py-1 bg-green-200 hover:bg-green-300 active:bg-green-100 transition duration-300 focus:outline-none text-sm rounded-lg">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-80 bg-gray-300 mt-4 rounded-lg"></div>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default ItemPage;
