import { useAuth } from "../contexts/AuthContext";
import NavListItem from "./NavListItem";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiCloudArrowUp,
} from "react-icons/hi2";

function MainNav() {
  const { user } = useAuth();

  const navLinks = [
    { to: "/classes", icon: HiOutlineHome, label: "Classes" },
    { to: "/bookings", icon: HiOutlineCalendarDays, label: "Bookings" },
    { to: "/blog", icon: HiOutlineBookOpen, label: "Blog" },
    {
      to: "/upload_xml",
      icon: HiCloudArrowUp,
      label: "Upload",
      roles: ["member"],
    },
    {
      to: "/account",
      icon: HiOutlineUsers,
      label: "Accounts",
      roles: ["member"],
    },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    return (
      !link.roles || !link.roles.includes("member") || user.role !== "member"
    );
  });

  return (
    <nav className="flex items-center justify-center bg-zinc-800 px-4 py-2 text-sm uppercase text-zinc-200 sm:px-6 md:text-base">
      <ul className="flex items-center gap-5 md:gap-8">
        {filteredNavLinks?.map((link) => (
          <NavListItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
