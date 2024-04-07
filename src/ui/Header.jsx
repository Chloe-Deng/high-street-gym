import { Link } from "react-router-dom";
import UserName from "../features/members/UserName";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-amber-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="font-semibold tracking-widest">
        High Street Gym Co.
      </Link>
      <div className="flex items-center gap-2">
        <UserName />
        <Link to="/" className="flex flex-col items-center gap-1">
          <HiOutlineArrowRightOnRectangle className="text-grey-0 h-4 w-4" />
          <span className="text-xs">Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
