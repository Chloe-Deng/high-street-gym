import AccountItem from "./AccountItem";
import { useUsers } from "../account/useUsers";
import Loader from "../../ui/Loader";

function AccountList() {
  const { isLoading, users } = useUsers();
  // console.log(users);

  if (isLoading || !users) return <Loader />;

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-base">
      <div className="text-uppercase grid grid-cols-5 items-center gap-x-6 border-b border-zinc-200 bg-zinc-100 p-4 font-semibold tracking-wide text-zinc-600">
        <div>User</div> {/* Placeholder for alignment */}
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        {/* <div>password</div> */}
        <div></div> {/* Placeholder for potential actions */}
      </div>

      {users.map((user) => (
        <AccountItem user={user} key={user.id} />
      ))}
    </div>
  );

  // return (
  //   <ul className="mt-3 divide-y divide-zinc-200 border-b">

  //   </ul>
  // );
}

export default AccountList;
