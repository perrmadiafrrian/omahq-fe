import { Navigation } from "../../components";
import { useEffect, useState, lazy, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useInView } from "react-intersection-observer";
const BarcodeScan = lazy(() => import("./BarcodeScan"));
const NewItem = lazy(() => import("./NewItem"));
const ItemPopUp = lazy(() => import("./ItemPopUp"));
const ItemButton = lazy(() => import("./ItemButton"));

/**
 * Item page of the selected house. This page
 * going to show all the items in the selected house
 *
 * @returns Item page component to be rendered
 */
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
  const [showScanner, setShowScanner] = useState(false);
  const [newBarcode, setNewBarcode] = useState(null);
  const [showNewForm, setShowNewForm] = useState(null);

  /**
   * Fetching items in the selected house
   * it will load next page if it is available
   */
  useEffect(() => {
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
    getItemsData();
  }, [id, itemPage]);

  /**
   * Fetching house data on page loaded
   */
  useEffect(() => {
    const getHouseData = async () => {
      await axiosInstance
        .get(`/house/${id}`)
        .then((res) => {
          setHouse(res.data);
        })
        .catch((err) => console.log(err));
    };
    getHouseData();
  }, [id]);

  /**
   * Remove or hide scrollbar for the body
   * if the modal is shown
   */
  useEffect(() => {
    showModal && document.body.classList.add("overflow-hidden");
    !showModal && document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  /**
   * Handle to show item data detail, including
   * its transaction that has been done
   *
   * @param {Object} data Item data
   */
  const handleModalOpening = (data) => {
    setShowNewForm(false);
    setItem(data);
    if (data) setShowModal(true);
  };

  /**
   * Handle to set the header to be sticky
   * on scrolled down after the navigation
   */
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

  /**
   * Setting item's page to be incremented
   * if it has more page
   */
  const handleLoadMore = useCallback(() => {
    if (!itemLoading && hasMore) {
      setItemPage((currentPage) => currentPage + 1);
    }
  }, [itemLoading, hasMore]);

  /**
   * if user scrolled down enough to the
   * bottom of the transaction data, it
   * will load more data
   */
  useEffect(() => {
    if (inView) handleLoadMore();
  }, [inView, handleLoadMore]);

  /**
   * Handling after barcode getting scanned
   * getting the barcode to fetch item data
   *
   * @param {Object} result barcode scan result
   */
  const handleScanned = async (result) => {
    setShowScanner(false);

    //TODO: LOADING STATE
    if (result) {
      await axiosInstance
        .get(`/item/barcode/${encodeURI(result.text)}/house/${id}`)
        .then((res) => {
          handleModalOpening(res.data);
        })
        .catch(({ response }) => {
          // If response status is `400` then open
          // the new item form
          if (response.status === 400) {
            setNewBarcode(result.text);
            setShowNewForm(true);
          }
        });
    }
  };

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
            <button
              onClick={() => setShowScanner(true)}
              className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out text-center rounded-lg text-sm py-2 px-4 text-white"
            >
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
      <BarcodeScan showScanner={showScanner} onScanned={handleScanned} />
      <NewItem
        shown={showNewForm}
        barcode={newBarcode}
        houseId={id}
        onClose={(data) => handleModalOpening(data)}
      />
    </div>
  );
};

export default ItemPage;
