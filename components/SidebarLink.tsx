"use client";

import Link from "next/link";
import { Settings, User, Home, DollarSign } from "react-feather";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { ILink } from "./Sidebar";

type IProps = {
  link: ILink;
};

const icons = { Settings, User, Home, DollarSign };

const SidebarLink: FC<IProps> = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={`${
          isActive ? "stroke-violet-600" : null
        } stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out`}
      />
    </Link>
  );
};

export default SidebarLink;
