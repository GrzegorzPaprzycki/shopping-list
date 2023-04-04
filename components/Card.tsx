import { FC, ReactNode } from "react";

type IProps = {
  className?: string;
  children: ReactNode;
};

const Card: FC<IProps> = ({ className, children }) => {
  return (
    <div
      className={`${className} rounded-3xl px-10 py-4 drop-shadow-xl bg-white`}>
      {children}
    </div>
  );
};

export default Card;
