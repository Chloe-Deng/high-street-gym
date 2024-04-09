import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiCloudArrowUp,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="flex items-center justify-center bg-zinc-800 px-4 py-2 text-sm uppercase text-zinc-200 sm:px-6 md:text-base">
      <ul className="flex items-center gap-5 md:gap-8">
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <Link to="/classes" className="flex flex-col items-center gap-1">
            <HiOutlineHome className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Classes</span>
          </Link>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <Link to="/bookings" className="flex flex-col items-center gap-1">
            <HiOutlineCalendarDays className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Bookings</span>
          </Link>
        </li>

        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <Link to="/blog" className="flex flex-col items-center gap-1">
            <HiOutlineBookOpen className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Blog</span>
          </Link>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <Link to="/upload_xml" className="flex flex-col items-center gap-1">
            <HiCloudArrowUp className="text-grey-0 h-6 w-6" />
            <span className="hidden md:block md:text-xs">UploadXML</span>
          </Link>
        </li>
        <li className="flex items-center justify-center gap-1 px-2 py-1">
          <Link to="/account" className="flex flex-col items-center gap-1">
            <HiOutlineUsers className="text-grey-0 h-6 w-6" />
            <span className="text-xs">Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
