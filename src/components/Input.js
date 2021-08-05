import { forwardRef } from "react";

const Input = forwardRef(({ type, requiredFail, ...props }, ref) => {
  const inputType = type ?? "text";
  const fails = requiredFail ? `border-red-300` : ``;

  return (
    <input
      ref={ref}
      type={inputType}
      {...props}
      className={`px-2 py-1 rounded border-2 bg-transparent focus:outline-none  w-full ${fails}
      border-gray-300 focus:border-blue-300 dark:border-gray-600 dark:focus:border-blue-800
      text-gray-800 dark:text-gray-100`}
    />
  );
});

Input.defaultProps = {
  type: "text",
};

const InputGroup = ({ children, label, ...props }) => {
  return (
    <div className="mb-4 flex flex-col space-y-2">
      <span className="text-base text-gray-900 dark:text-gray-50 font-semibold">
        {label}
      </span>
      {children}
    </div>
  );
};

export { Input, InputGroup };
