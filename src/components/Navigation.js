const Navigation = (props) => {
  return (
    <div className="w-full shadow-lg px-2 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto h-16 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center"></div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <button className="text-lg text-center px-3 py-2">Home</button>
              <button className="text-lg text-center px-3 py-2">Stores</button>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ms:ml-6 sm:pr-0">
          <div className="ml-6 relative">
            <span>Permadi Afrian</span>
          </div>
          <div className="ml-2 relative">
            <div>
              <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
