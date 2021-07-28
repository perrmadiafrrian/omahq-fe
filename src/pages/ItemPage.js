import { Navigation, Modal, LoadingSpinner } from "../components";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const formatter = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ItemPage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [house, setHouse] = useState({});
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loadingTransaction, setLoadingTransaction] = useState(true);
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
        })
        .catch((err) => console.log(err));
    };
    getHouseData();
    getItemsData();
  }, [id]);

  useEffect(() => {
    showModal && document.body.classList.add("overflow-hidden");
    !showModal && document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  const handleModalOpening = async (data, page = 0) => {
    setItem(data);
    setShowModal(true);
    setLoadingTransaction(true);
    await axiosInstance
      .get(`/transaction/byitem/${data.id}?type=ti&limit=20&page=${page}`)
      .then((res) => {
        setTransactions(res.data.transactions);
        setLoadingTransaction(false);
      })
      .catch((err) => console.log(err));
  };

  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 0.5) {
      console.log(`SCROLLED DOWN`);
    }
  };

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
        <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-center">
          {items.map((v, i) => (
            <div
              key={i}
              className="w-80 h-36 sm:m-3 m-2 relative overflow-hidden bg-white shadow-md rounded-2xl flex justify-items-center"
            >
              <div className="w-36 h-full bg-gray-500 rounded-l-xl mr-2 overflow-hidden">
                <img
                  src={v.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-xl max-w-10 flex flex-col justify-between h-full">
                <span className="text-lg font-bold">{v.name}</span>
                <span className="text-sm mb-3">{v.description}</span>
                <span className="text-sm pb-2">{`${v.quantity} pcs`}</span>
              </div>
              <button
                onClick={() => handleModalOpening(v)}
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
        classNames="modal-lg"
      >
        <Modal
          ref={nodeRef}
          closing={() => setShowModal(false)}
          title={item?.name}
        >
          <div className="flex flex-col px-1">
            <div className="flex flex-row space-x-2">
              <div className="w-24 h-36 sm:w-36 sm:h-36 bg-gray-500 rounded-xl mr-2 overflow-hidden">
                <img
                  src={item?.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-sm font-semibold">{item?.barcode}</div>
                <div className="text-xs flex-1">{item?.description}</div>
                <div className="w-full flex flex-row justify-between">
                  <div className="text-base">{item?.quantity} pcs</div>
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
            <div
              onScroll={handleScroll}
              className="h-80 max-h-80 overflow-y-scroll bg-gray-300 mt-4 rounded-lg overflow-hidden"
            >
              {loadingTransaction ? (
                <div className="h-full w-full flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <table className="w-full m-2">
                  <tbody>
                    {transactions.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{v.store?.name}</td>
                          <td>{formatter.format(v.price)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default ItemPage;
