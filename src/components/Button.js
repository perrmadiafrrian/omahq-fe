const colorClasses = {
  gray: "border-gray-200 hover:border-gray-400 bg-gray-200 active:bg-gray-400",
  blue: "border-blue-200 hover:border-blue-400 bg-blue-200 active:bg-blue-400",
  red: "border-red-200 hover:border-red-400 bg-red-200 active:bg-red-400",
  green:
    "border-green-200 hover:border-green-400 bg-green-200 active:bg-green-400",
  yellow:
    "border-yellow-200 hover:border-yellow-400 bg-yellow-200 active:bg-yellow-400",
  indigo:
    "border-indigo-200 hover:border-indigo-400 bg-indigo-200 active:bg-indigo-400",
  purple:
    "border-purple-200 hover:border-purple-400 bg-purple-200 active:bg-purple-400",
  pink: "border-pink-200 hover:border-pink-400 bg-pink-200 active:bg-pink-400",
};

//TODO: onClick event handling
function Button(props) {
  const colorClass = colorClasses[props.color ?? "gray"];
  const addClass = props.addClass ?? "";
  return (
    <button
      className={`rounded px-2 py-1 focus:outline-none border-2 ${addClass} ${colorClass}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
