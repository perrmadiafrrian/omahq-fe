import Navigation from "../components/Navigation";
import houseIcon from "../icons/house.svg";

const Home = (props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="flex justify-center space-x-20 py-20 px-72 md:px-60 sm:px-10">
        <div className="w-40 h-40 shadow-lg rounded-lg bg-white flex flex-col items-center justify-around">
          <img src={houseIcon} alt="" className="w-20" />
          <span className="text-xl">My House</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
