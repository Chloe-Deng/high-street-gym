// import AccountItem from "../features/account/AccountItem";
import { useAuth } from "../contexts/AuthContext";
import AccountList from "../features/account/AccountList";

import Unauthorized from "../ui/Unauthorized";

function Account({ accessRoles = ["admin", "trainer"] }) {
  const { user } = useAuth();
  const userIsAuthorized = user && accessRoles.includes(user.role);
  return (
    <>
      <div className="mb-5 mt-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      {userIsAuthorized ? <AccountList /> : <Unauthorized />}
    </>
  );
}

export default Account;
