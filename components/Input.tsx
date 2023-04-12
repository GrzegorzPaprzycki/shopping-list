import { FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`${className} border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full`}
      {...props}
    />
  );
};

export default Input;
