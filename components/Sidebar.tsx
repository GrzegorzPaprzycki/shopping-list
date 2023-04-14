import Card from "./Card";
import SidebarLink from "./SidebarLink";

export type ILink = {
  label: string;
  icon: "Home" | "Calendar" | "User" | "Settings";
  link: string;
};

const links: ILink[] = [
  { label: "Home", icon: "Home", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
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
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
};

export default Sidebar;
