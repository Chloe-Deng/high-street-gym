import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi2";

function UserName() {
  const { user, isAuthenticated, logout } = useAuth();
  console.log(user);

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
          <Link to="/profile">
            <HiOutlineUserCircle className="h-[1.3rem] w-[1.3rem]" />
          </Link>
          <Button onClick={handleClick}>
            <HiOutlineArrowRightOnRectangle className="text-grey-700 h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button variation="small" to={"/login"}>
          Login
        </Button>
      )}
    </div>
  );
}

export default UserName;
