import { NavHamButton, NavMenu } from "./SmNav";
import NavProfile from "./NavProfile";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full bg-white shadow-lg px-2 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto h-16 flex items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <NavHamButton />
        </div>
        <div className="flex-1 flex self-stretch justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex h-full space-x-4">
              <Link to="/">
                <button className="text-lg h-full focus:outline-none border-b-2 border-blue-400 hover:text-gray-400 text-black transition duration-300 ease-in-out text-center px-3 py-2">
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
        <NavProfile />
      </div>
      <NavMenu />
    </div>
  );
};

export default Navigation;
