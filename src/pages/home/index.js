import { Navigation } from "../../components";
import houseIcon from "../../icons/house.svg";
import plusIcon from "../../icons/plus.svg";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HomeForm from "./HomeForm";
import AlertContext from "../../contexts/AlertContext";

const Home = (props) => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [houses, setHouses] = useState([]);
  const [showModalNew, setShowModalNew] = useState(false);
  const { showAlert } = useContext(AlertContext);

  const handleHouseClick = (id) => {
    history.push(`/house/${id}`);
  };

  const handleHouseRighClick = (e, id) => {
    e.preventDefault();
    const c_houses = [...houses];
    c_houses.map((v, i) => {
      v.edit = false;
      return v;
    });
    if (id !== null) c_houses[id].edit = c_houses[id].edit === false;
    setHouses(c_houses);
  };

  const handleAddAlert = (newAlert) => {
    showAlert(newAlert);
  };

  const handle = () =>
    showAlert([
      {
        message: "One more alert to test",
        title: "Test 2",
        type: "fail",
      },
      {
        message: "other alert",
        title: "Test",
        type: "info",
      },
    ]);

  useEffect(() => {
    const fetchHouses = async () =>
      await axiosInstance
        .request(`/house/byowner/${auth.data.id}`)
        .then((res) => {
          const result_houses = res.data.houses;
          result_houses.map((v, i) => {
            v.edit = false;
            return v;
          });
          setHouses(result_houses);
        })
        .catch((err) => {
          console.log(err);
        });

    fetchHouses();
  }, [auth.data.id]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="py-10 lg:py-16">
        <div className="flex flex-wrap justify-center">
          {houses.map((v, i) => {
            return (
              <button
                key={i}
                onClick={v.edit ? handle : () => handleHouseClick(v.id)}
                onContextMenu={(e) => handleHouseRighClick(e, i)}
                onBlur={(e) => handleHouseRighClick(e, null)}
                className="w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out"
              >
                {!v.edit ? (
                  <img src={houseIcon} alt="" className="w-14 lg:w-20" />
                ) : (
                  <span className="text-2xl font-medium text-yellow-400">
                    Edit?
                  </span>
                )}
                <span className="text-base md:text-xl">{v.name}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowModalNew(true)}
            className="w-32 h-32 m-2 lg:w-36 lg:h-36 lg:m-2 border-4 border-dashed border-gray-200 rounded-lg bg-gray-100 flex flex-col items-center justify-around focus:outline-none active:bg-gray-300 active:border-gray-300 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
          >
            <div className="text-blue-600">
              <img src={plusIcon} alt="" className="w-14 lg:w-20" />
            </div>
            <span className="text-base md:text-xl">New House</span>
          </button>
        </div>
      </div>
      <HomeForm
        setShowModal={setShowModalNew}
        showModal={showModalNew}
        cleanOnOpen
        setHouses={setHouses}
        houses={houses}
        addAlert={handleAddAlert}
      />
    </div>
  );
};

export default Home;
