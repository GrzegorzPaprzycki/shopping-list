import { FC } from "react";

type IProps = {
  className?: string;
};

const Input: FC<IProps> = ({ className, ...props }) => {
  return (
    <input
      className={`${className} border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full`}
      {...props}
    />
  );
};

export default Input;
