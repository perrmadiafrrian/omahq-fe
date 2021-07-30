import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

const ItemButton = ({ data, onClick, scrollPosition }) => {
  return (
    <div className="w-80 h-36 sm:m-3 m-2 relative overflow-hidden bg-white shadow-md rounded-2xl flex justify-items-center">
      <div className="w-36 h-full bg-gray-500 rounded-l-xl mr-2 overflow-hidden">
        <LazyLoadImage
          src={data.image}
          alt="Item Image"
          height="100%"
          width="100%"
          wrapperClassName="h-full w-full flex-1"
          className="object-cover w-full h-full"
          effect="black-and-white"
          threshold={100}
          scrollPosition={scrollPosition}
        />
      </div>
      <div className="rounded-xl max-w-10 flex flex-col justify-between h-full">
        <span className="text-lg font-bold">{data.name}</span>
        <span className="text-sm mb-3">
          {data.description.length > 40
            ? `${data.description.substr(0, 38)}..`
            : data.description}
        </span>
        <span className="text-sm pb-2">{`${data.quantity} pcs`}</span>
      </div>
      <button
        onClick={onClick}
        className="absolute opacity-0 hover:opacity-40 duration-500 ease-in-out flex justify-center items-center bg-gray-500 w-full h-full z-10"
      >
        <span className="text-5xl font-bold">...</span>
      </button>
    </div>
  );
};

export default trackWindowScroll(ItemButton);
