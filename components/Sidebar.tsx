import Card from "./Card";
import SidebarLink from "./SidebarLink";

export type ILink = {
  label: string;
  icon: "Home" | "DollarSign" | "User" | "Settings";
  link: string;
};

const links: ILink[] = [
  { label: "Home", icon: "Home", link: "/home" },
  {
    label: "wallet",
    icon: "DollarSign",
    link: "/wallet",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex flex-col items-center justify-around flex-wrap mr-6">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
};

export default Sidebar;
