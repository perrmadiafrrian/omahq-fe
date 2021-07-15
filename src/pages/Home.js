import Navigation from "../components/Navigation";
import houseIcon from "../icons/house.svg";

const Home = (props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="py-10 lg:py-16">
        <div className="flex flex-wrap justify-center">
          <button className="w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <img src={houseIcon} alt="" className="w-14 lg:w-20" />
            <span className="text-base md:text-xl">My House</span>
          </button>
          <button className="w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <img src={houseIcon} alt="" className="w-14 lg:w-20" />
            <span className="text-base md:text-xl">My House</span>
          </button>
          <button className="w-32 h-32 m-2 lg:w-40 lg:h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <img src={houseIcon} alt="" className="w-14 lg:w-20" />
            <span className="text-base md:text-xl">My House</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
