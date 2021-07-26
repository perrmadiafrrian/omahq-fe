import { forwardRef } from "react";

const Input = forwardRef(
  (
    { type, onChange, placeholder, value, requiredFail, disabled, ...props },
    ref
  ) => {
    const inputType = type ?? "text";
    const fails = requiredFail ? `border-red-300` : ``;

    //TODO: handle required, extra class
    return (
      <input
        ref={ref}
        type={inputType}
        value={value}
        disabled={disabled}
        className={`px-2 py-1 rounded border-2 bg-transparent focus:outline-none border-gray-300 focus:border-blue-300 w-full ${fails}`}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
      />
    );
  }
);

Input.defaultProps = {
  type: "text",
  onChange: () => {},
  placeholder: "",
  disabled: false,
};

const InputGroup = ({ children, label, ...props }) => {
  return (
    <div className="mb-4 flex flex-col space-y-2">
      <span className="text-base font-semibold">{label}</span>
      {children}
    </div>
  );
};

export { Input, InputGroup };
