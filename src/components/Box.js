const Box = (props) => {
  const addClass = props.addClass ?? "";

  return (
    <div
      className={`min-w-full min-h-half border-gray-400 border-2 border-opacity-10 shadow-xl rounded-lg px-4 py-2 ${addClass}`}
    >
      {props.children}
    </div>
  );
};

export default Box;
