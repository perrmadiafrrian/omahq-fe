import { Navigation } from "../../components";
import { GiHouse } from "react-icons/gi";
import { FaEdit, FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HomeForm from "./HomeForm";
import AlertContext from "../../contexts/AlertContext";
import LoadingContext from "../../contexts/LoadingContext";
import errorResponseHandler from "../../utils/errorResponseHandler";

/**
 * Home page that shows the user's available
 * houses, user can create and edit the house
 * name
 *
 * @returns houses component to be rendered
 */
const Home = () => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [houses, setHouses] = useState([]);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const { loadingProcess, loadingDone } = useContext(LoadingContext);
  const [editData, setEditData] = useState(null);

  /**
   * Handle the house link that change
   * page location to house with the
   * given house's id
   *
   * @param {Number} id
   */
  const handleHouseClick = (id) => {
    history.push(`/house/${id}`);
  };

  /**
   * Handling the house right click event
   * to change house action to become an
   * edit action for the house
   *
   * @param {Event} e
   * @param {Number} id
   */
  const handleHouseRightClick = (e, id) => {
    e.preventDefault();
    const c_houses = [...houses];
    c_houses.map((v, i) => {
      v.edit = false;
      return v;
    });
    if (id !== null) c_houses[id].edit = c_houses[id].edit === false;
    setHouses(c_houses);
  };

  /**
   * Handling the house edit action
   * to change the edited house data
   *
   * @param {Object} house house data
   */
  const handleHouseEdit = (house) => {
    setEditData(house);
  };

  /**
   * Handling the alert to be showing the
   * given alert data
   *
   * @param {Object} newAlert alert data
   */
  const handleAddAlert = (newAlert) => {
    showAlert(newAlert);
  };

  /**
   * Handling the edit on close event
   * to set the edit data to be null
   */
  const handleEditClosing = () => {
    setEditData(null);
  };

  const fetchHouses = useCallback(async () => {
    loadingProcess("FETCH_HOUSES");
    await axiosInstance
      .request(`/house/byowner/${auth.data.id}`)
      .then((res) => {
        const result_houses = res.data.houses;
        result_houses.map((v, i) => {
          v.edit = false;
          return v;
        });
        setHouses(result_houses);
        loadingDone("FETCH_HOUSES");
      })
      .catch(({ response }) => {
        errorResponseHandler(response, showAlert);
      });
  }, [auth.data.id, showAlert, loadingProcess, loadingDone]);

  /**
   * Fetch house data everytime
   * the user load the page
   */
  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  /**
   * On `editData` changes, it will check if
   * `editData` is empty or not, then show
   * the modal if `editData` is available
   */
  useEffect(() => {
    if (editData) {
      setShowModalEdit(true);
    }
  }, [editData]);

  return (
    <div className="bg-gray-100 dark:bg-gray-700 min-h-screen">
      <Navigation />
      <div className="py-10 lg:py-16">
        <div className="flex flex-wrap justify-center">
          {houses.map((v, i) => {
            return (
              <button
                key={i}
                onClick={
                  v.edit
                    ? () => handleHouseEdit(v)
                    : () => handleHouseClick(v.id)
                }
                onContextMenu={(e) => handleHouseRightClick(e, i)}
                onBlur={(e) => handleHouseRightClick(e, null)}
                className={`w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg  ${
                  v.edit
                    ? "text-yellow-400 hover:text-yellow-500"
                    : "text-blue-500 hover:text-blue-600"
                } rounded-lg bg-white hover:bg-gray-200 active:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600 dark:active:bg-gray-500 focus:outline-none flex flex-col items-center justify-around transition-colors duration-200 ease-in-out`}
              >
                <IconContext.Provider
                  value={{
                    className: `w-14 h-14 lg:w-20 lg:h-20`,
                  }}
                >
                  {v.edit ? <FaEdit /> : <GiHouse />}
                </IconContext.Provider>
                <span className="text-base font-medium md:text-xl">
                  {v.name}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => setShowModalNew(true)}
            className={`w-32 h-32 m-2 lg:w-40 lg:h-40 lg:m-2
            text-gray-500 hover:text-gray-600 border-gray-200 bg-gray-100 active:bg-gray-300 active:border-gray-300 hover:bg-gray-200
            dark:text-gray-100 dark:hover:text-gray-200 dark:border-gray-900 dark:bg-gray-700 dark:active:bg-gray-500 dark:hover:bg-gray-600
            border-4 border-dashed rounded-lg flex flex-col items-center justify-around focus:outline-none transition-colors duration-200 ease-in-out`}
          >
            <IconContext.Provider
              value={{
                className: `w-14 h-14 lg:w-20 lg:h-20`,
              }}
            >
              <FaPlus />
            </IconContext.Provider>
            <span className="text-base font-medium md:text-xl">New House</span>
          </button>
        </div>
      </div>
      <HomeForm
        setShowModal={setShowModalNew}
        showModal={showModalNew}
        cleanOnOpen
        setHouses={setHouses}
        addAlert={handleAddAlert}
      />
      <HomeForm
        setShowModal={setShowModalEdit}
        showModal={showModalEdit}
        editId={editData?.id}
        houseName={editData?.name}
        setHouses={setHouses}
        addAlert={handleAddAlert}
        onClose={handleEditClosing}
      />
    </div>
  );
};

export default Home;
