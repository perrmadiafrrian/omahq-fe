import { forwardRef } from "react";

const TextArea = forwardRef(({ requiredFail, ...props }, ref) => {
  const fails = requiredFail ? `border-red-300` : ``;

  return (
    <textarea
      ref={ref}
      {...props}
      className={`resize-none px-2 py-1 rounded border-2 bg-transparent focus:outline-none border-gray-300 focus:border-blue-300 w-full ${fails}`}
    />
  );
});

export default TextArea;
