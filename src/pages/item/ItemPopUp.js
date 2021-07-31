import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { CSSTransition } from "react-transition-group";
import { Modal, LoadingSpinner } from "../../components";
import axiosInstance from "../../utils/axiosInstance";

// Currency Formatter for transaction price
const formatter = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ItemPopUp = ({ item, showModal, setShowModal }) => {
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const nodeRef = useRef();
  const transactionContainerRef = useRef();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { ref, inView } = useInView({ threshold: 0 });

  /**
   * Handle Fetching Transaction Data.
   * Fetch data on item selected changes,
   * modal opened, or load more.
   */
  useEffect(() => {
    const fetchTransaction = async () =>
      await axiosInstance
        .get(
          `/transaction/byitem/${item?.id}?type=ti&limit=20&page=${currentPage}`
        )
        .then(({ data }) => {
          setTransactions((transaction) => [
            ...transaction,
            ...data.transactions.filter((v, i) => {
              if (transaction.find((el) => el.id === v.id)) return false;
              return v.id;
            }),
          ]);
          setHasMore(data.has_more);
          setLoadingTransaction(false);
        })
        .catch((err) => console.log(err));

    // Only load data if this component is shown
    if (showModal) {
      setLoadingTransaction(true);
      fetchTransaction();
    }
  }, [currentPage, item, showModal]);

  /**
   * Determine if item has more transaction
   * then load more transaction data if `true`
   */
  const handleLoadMore = useCallback(() => {
    if (!loadingTransaction && hasMore) {
      setCurrentPage((page) => page + 1);
    }
  }, [loadingTransaction, hasMore]);

  /**
   * Checking if user reaching to the
   * bottom of the data then calling
   * `handleLoadMore` if its true
   */
  useEffect(() => {
    if (inView) handleLoadMore();
  }, [inView, handleLoadMore]);

  const handleModalClosing = () => {
    setShowModal(false);
    setHasMore(false);
    setCurrentPage(0);
    setTransactions([]);
  };

  return (
    <CSSTransition
      in={showModal}
      timeout={300}
      unmountOnExit
      nodeRef={nodeRef}
      classNames="modal-lg"
    >
      <Modal ref={nodeRef} closing={handleModalClosing} title={item?.name}>
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
            className={`h-80 max-h-80 relative bg-gray-300 mt-2 rounded-lg overflow-hidden`}
            ref={transactionContainerRef}
          >
            {loadingTransaction ? (
              <div className="inset-0 z-20 absolute backdrop-filter backdrop-blur-sm flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : undefined}
            <div className="h-full px-2 py-1 overflow-y-scroll">
              <table className="w-full">
                <tbody>
                  {transactions.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.store?.name}</td>
                        <td>{formatter.format(v.price)}</td>
                      </tr>
                    );
                  })}
                  <tr ref={ref}></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default ItemPopUp;
