function Input(props) {
  const type = props.type ?? "text";

  const handleInputChange = (e) => {
    const target = e.target;
    if (props.textValue) props.textValue(target.value);
  };

  //TODO: handle required, extra class
  return (
    <input
      type={type}
      className={`px-2 py-1 rounded border-2 bg-transparent focus:outline-none border-gray-300 focus:border-blue-300 w-full`}
      onChange={(e) => handleInputChange(e)}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
