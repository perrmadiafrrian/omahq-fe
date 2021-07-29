import { Navigation } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ItemPopUp from "./ItemPopUp";

const ItemPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [house, setHouse] = useState({});
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const { id } = useParams();

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

  const handleModalOpening = async (data) => {
    setItem(data);
    setShowModal(true);
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
                <span className="text-sm mb-3">
                  {v.description.length > 40
                    ? `${v.description.substr(0, 38)}..`
                    : v.description}
                </span>
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
      <ItemPopUp
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
      />
    </div>
  );
};

export default ItemPage;
