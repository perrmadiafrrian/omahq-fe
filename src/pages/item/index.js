import { Navigation } from "../../components";
import { useEffect, useState, lazy, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useInView } from "react-intersection-observer";
const ItemPopUp = lazy(() => import("./ItemPopUp"));
const ItemButton = lazy(() => import("./ItemButton"));

const ItemPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [house, setHouse] = useState({});
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemPage, setItemPage] = useState(0);
  const [itemLoading, setItemLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { id } = useParams();
  const [stickyHeader, setStickyHeader] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

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
      setItemLoading(true);
      await axiosInstance
        .get(`/item?house=${id}&limit=10&page=${itemPage}`)
        .then(({ data }) => {
          setHasMore(data.has_more);
          setItems((items) => [
            ...items,
            ...data.items.filter((v, i) => {
              if (items.find((el) => el.id === v.id)) return false;
              return v.id;
            }),
          ]);
          setItemLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getHouseData();
    getItemsData();
  }, [id, itemPage]);

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

  const handleLoadMore = useCallback(() => {
    if (!itemLoading && hasMore) {
      setItemPage((currentPage) => currentPage + 1);
    }
  }, [itemLoading, hasMore]);

  useEffect(() => {
    if (inView) handleLoadMore();
  }, [inView, handleLoadMore]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className={`flex flex-col`}>
        <div
          className={`pt-6 pb-4 mb-4 px-6 w-full flex justify-between ${
            stickyHeader
              ? "sticky top-0 z-20 bg-white shadow-xl rounded-b-lg"
              : "bg-indigo-100 shadow"
          } transition duration-500`}
        >
          <div className="px-6 sm:px-16 text-xl sm:text-3xl font-bold text-gray-900">
            {house?.name}
          </div>
          <div className="px-6 sm:px-16">
            <button className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out text-center rounded-lg text-sm py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center">
          {items.map((v, i) => (
            <ItemButton
              key={i}
              data={v}
              onClick={() => handleModalOpening(v)}
            />
          ))}
          <div className="" ref={ref}></div>
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
