const Loading = (props) => {
  return (
    <div className="fixed inset-0 z-50 filter backdrop-filter backdrop-blur-md flex justify-center items-center">
      <span className="animate-ping absolute h-40 w-40 rounded-full bg-yellow-400 opacity-75"></span>
      <span className="relative rounded-full h-40 w-40 bg-yellow-500 flex justify-center items-center">
        <span className="text-center text-2xl font-bold text-white">OmahQ</span>
      </span>
    </div>
  );
};

export default Loading;
