import Navigation from "../components/Navigation";
import houseIcon from "../icons/house.svg";
import plusIcon from "../icons/plus.svg";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [houses, setHouses] = useState([]);

  const handleHouseClick = (id) => {
    history.push(`/house/${id}`);
  };

  useEffect(() => {
    const fetchHouses = async () =>
      await axiosInstance
        .request(`/house/byowner/${auth.data.id}`)
        .then((res) => {
          const result_houses = res.data.houses;
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
        <div className="flex flex-wrap justify-center space-x-6">
          {houses.map((v, i) => {
            return (
              <button
                key={i}
                onClick={() => handleHouseClick(v.id)}
                className="w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out"
              >
                <img src={houseIcon} alt="" className="w-14 lg:w-20" />
                <span className="text-base md:text-xl">{v.name}</span>
              </button>
            );
          })}
          <button className="w-32 h-32 m-2 lg:w-36 lg:h-36 lg:m-2 border-4 border-dashed border-gray-200 rounded-lg bg-gray-100 flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <div className="text-blue-600">
              <img src={plusIcon} alt="" className="w-14 lg:w-20" />
            </div>
            <span className="text-base md:text-xl">New House</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
