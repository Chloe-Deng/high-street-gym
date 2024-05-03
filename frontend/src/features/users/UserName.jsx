import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// import Button from "../../ui/Button";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
} from "react-icons/hi2";

function UserName() {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className="text-base font-semibold">
      {isAuthenticated ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <p>{user?.firstName}</p>
          <NavLink
            className={({ isActive }) =>
              ` transition-colors duration-300 ${
                isActive ? "text-zinc-50" : "hover:text-zinc-50"
              }`
            }
            to="/profile"
          >
            <HiOutlineUserCircle className="h-[1.3rem] w-[1.3rem]" />
          </NavLink>
          <button
            className="transition-colors duration-300 hover:text-zinc-50"
            onClick={handleClick}
          >
            <HiOutlineArrowRightOnRectangle className="text-grey-700 h-5 w-5" />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserName;
