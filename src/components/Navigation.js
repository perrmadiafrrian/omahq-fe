const { default: NavProfile } = require("./NavProfile");

const Navigation = (props) => {
  return (
    <div className="w-full bg-white shadow-lg px-2 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto h-16 flex items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200 ease-in-out">
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6H16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex self-stretch justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:block sm:ml-6">
            <div className="flex h-full space-x-4">
              <button className="text-lg focus:outline-none border-b-2 border-blue-400 hover:text-gray-400 text-black transition duration-300 ease-in-out text-center px-3 py-2">
                Home
              </button>
              <button className="text-lg focus:outline-none hover:text-gray-400 text-black transition duration-300 ease-in-out text-center px-3 py-2">
                Stores
              </button>
            </div>
          </div>
        </div>
        <NavProfile />
      </div>
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button className="text-lg block text-center px-3 py-2">Home</button>
          <button className="text-lg block text-center px-3 py-2">
            Stores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
