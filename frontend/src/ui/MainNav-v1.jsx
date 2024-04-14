import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiCloudArrowUp,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

function MainNav() {
  // const { isAuthenticated, user } = useAuth();

  return (
    <nav className="flex items-center justify-center bg-zinc-800 px-4 py-2 text-sm uppercase text-zinc-200 sm:px-6 md:text-base">
      <ul className="flex items-center gap-5 md:gap-8">
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <NavLink
            to="/classes"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`
            }
          >
            <HiOutlineHome className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Classes</span>
          </NavLink>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`
            }
          >
            <HiOutlineCalendarDays className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Bookings</span>
          </NavLink>
        </li>

        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`
            }
          >
            <HiOutlineBookOpen className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Blog</span>
          </NavLink>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <NavLink
            to="/upload_xml"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`
            }
          >
            <HiCloudArrowUp className="text-grey-0 h-6 w-6" />
            <span className="hidden md:block md:text-xs">Upload</span>
          </NavLink>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`
            }
          >
            <HiOutlineUsers className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Accounts</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
