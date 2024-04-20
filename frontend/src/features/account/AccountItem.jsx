// import { useAuth } from "../../contexts/AuthContext";
// import Button from "../../ui/Button";
// import FormRow from "../../ui/FormRow";
import React, { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import UpdateAccountForm from "./UpdateAccountForm";
import { useDeleteUser } from "./useDeleteUser";
import getStoredAuthKey from "../../utils/getStoredAuthKey";

function AccountItem({ user }) {
  const authenticationKey = getStoredAuthKey();
  const { id: userID, firstName, lastName, email } = user;
  // console.log(user);
  const { isDeleting, deleteUser } = useDeleteUser();

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-x-3 border-b border-zinc-200 p-4 last:border-b-0 sm:grid-cols-5 sm:gap-x-6">
        <div className="text-sm text-zinc-600">{userID}</div>
        <div className="text-sm text-zinc-600">{firstName}</div>
        <div className="hidden text-sm text-zinc-600 sm:block">{lastName}</div>
        <div className="overflow-x-auto text-zinc-600 sm:overflow-x-visible">
          {email}
        </div>
        {/* {password ? (
          <div className="font-medium text-green-700">{password}</div>
        ) : (
          <span>&mdash;</span>
        )} */}
        <div className="ml-auto flex gap-0.5">
          <button
            className="text-green-700"
            onClick={() => setShowForm((show) => !show)}
          >
            <HiPencil />
          </button>
          <button
            className="text-red-800"
            onClick={() => deleteUser({ userID, authenticationKey })}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </div>
      {showForm && <UpdateAccountForm userToUpdate={user} />}
    </>
    // <li className="flex flex-col px-2 py-4 md:px-4">
    //   <p className="mb-4 text-xs text-zinc-500">{firstName}</p>
    //   <p className="mb-4 text-sm">{lastName}</p>
    //   <p className="text-xs text-zinc-500">{email}</p>
    //   <p className="text-xs text-zinc-500">{password}</p>
    // </li>
  );
}

export default AccountItem;
