import { Navigation } from "../../components";
import { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
const ItemPopUp = lazy(() => import("./ItemPopUp"));
const ItemButton = lazy(() => import("./ItemButton"));

const ItemPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [house, setHouse] = useState({});
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const { id } = useParams();
  const [stickyHeader, setStickyHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      const window_scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (window_scroll > 64) {
        setStickyHeader(true);
      } else {
        setStickyHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className={`flex flex-col`}>
        <div
          className={`pt-6 pb-4 mb-4 bg-indigo-50 px-6 w-full flex justify-between shadow ${
            stickyHeader ? "sticky top-0 z-20" : ""
          }`}
        >
          <div className="px-6 md:px-16 text-2xl font-bold">{house?.name}</div>
          <div className="px-6 md:px-16">
            <button className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out text-center rounded-lg text-sm py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center items-center">
          {items.map((v, i) => (
            <ItemButton
              key={i}
              data={v}
              onClick={() => handleModalOpening(v)}
            />
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
