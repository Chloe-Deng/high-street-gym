// import AccountItem from "../features/account/AccountItem";
import { useAuth } from "../contexts/AuthContext";
import AccountList from "../features/account/AccountList";

import Unauthorized from "../ui/Unauthorized";

function Account({ accessRoles = ["admin", "trainer"] }) {
  const { user } = useAuth();
  const userIsAuthorized = user && accessRoles.includes(user.role);
  return (
    <>
      
      {userIsAuthorized ? <AccountList /> : <Unauthorized />}
    </>
  );
}

export default Account;
