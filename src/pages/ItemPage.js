import Navigation from "../components/Navigation";

const ItemPage = (props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation />
      <div className="flex">
        <div className="py-6 md:py-10 w-full flex justify-between">
          <div className="px-6 md:px-16 text-3xl font-bold">House 1 -</div>
          <div className="px-6 md:px-16">
            <button className="bg-green-500 rounded-lg py-2 px-4 text-white">
              Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
