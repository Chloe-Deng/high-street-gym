import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

function UserName() {
  const { user, isAuthenticated, logout } = useAuth();
  console.log(user);

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className=" text-base font-semibold ">
      {isAuthenticated ? (
        <div className="flex gap-2">
          <p>{user?.firstName}</p>
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
