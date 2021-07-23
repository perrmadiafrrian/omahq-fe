//TODO: ALERT

const Alert = ({ options, message, close, ...rest }) => {
  return (
    <div className="bg-red-200 p-4 uppercase rounded-xl flex justify-between items-center shadow-xl w-80 box-border">
      {message}
      <button
        onClick={close}
        className="bg-red-500 p-4 hover:bg-red-400 active:bg-red-300"
      >
        X
      </button>
    </div>
  );
};

export default Alert;
