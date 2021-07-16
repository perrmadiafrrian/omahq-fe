import Navigation from "../components/Navigation";

const ItemPage = (props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="flex flex-col">
        <div className="pt-6 pb-4 mb-4 bg-indigo-50 px-6 w-full flex justify-between shadow">
          <div className="px-6 md:px-16 text-3xl font-bold">House 1 -</div>
          <div className="px-6 md:px-16">
            <button className="bg-green-500 hover:bg-green-600 duration-300 ease-in-out rounded-lg py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center space-x-6">
          <div className="w-80 h-44 bg-white hover:bg-yellow-50 duration-300 ease-in-out shadow-md rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
