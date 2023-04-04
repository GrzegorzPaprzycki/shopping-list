import { FC, ReactNode } from "react";

type IProps = {
  className?: string;
  children: ReactNode;
};

const GlassPane: FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} glass rounded-2xl border-solid border-2 border-gray-200`}>
      {children}
    </div>
  );
};

export default GlassPane;
