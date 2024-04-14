import AccountItem from "./AccountItem";
import { useUsers } from "../account/useUsers";
import Loader from "../../ui/Loader";

function AccountList() {
  const { isLoading, users } = useUsers();
  // console.log(users);

  if (isLoading || !users) return <Loader />;

  return (
    <>
      <div className="mb-5 mt-10 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-base">
        <div className="text-uppercase grid grid-cols-4 items-center gap-x-4 border-b border-zinc-200 bg-zinc-100 p-4 font-semibold tracking-wide text-zinc-600 sm:grid-cols-5 sm:gap-x-6">
          <div>User</div> {/* Placeholder for alignment */}
          <div>First name</div>
          <div className="hidden sm:block">Last name</div>
          <div>Email</div>
          {/* <div>password</div> */}
          <div></div> {/* Placeholder for potential actions */}
        </div>

        {users.map((user) => (
          <AccountItem user={user} key={user.id} />
        ))}
      </div>
    </>
  );

  // return (
  //   <ul className="mt-3 divide-y divide-zinc-200 border-b">

  //   </ul>
  // );
}

export default AccountList;
