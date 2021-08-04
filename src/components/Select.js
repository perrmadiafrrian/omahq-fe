import { forwardRef } from "react";

const Select = forwardRef(
  ({ requiredFail, data, onMore, placeholder, ...props }, ref) => {
    const fails = requiredFail ? `border-red-300` : ``;

    return (
      <select
        ref={ref}
        {...props}
        defaultValue={"null"}
        className={`px-2 py-1 rounded border-2 bg-transparent focus:outline-none border-gray-300 focus:border-blue-300 w-full appearance-none ${fails}`}
      >
        {placeholder ? (
          <option disabled value={"null"} className="text-gray-400">
            {placeholder}
          </option>
        ) : undefined}
        {data.map((v, i) => (
          <option key={i} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
    );
  }
);

Select.defaultProps = {
  data: [],
};

export default Select;
