// import { useAuth } from "../../contexts/AuthContext";
// import Button from "../../ui/Button";
// import FormRow from "../../ui/FormRow";
import React, { useState } from "react";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import CreateAccountForm from "./CreateAccountForm";

function AccountItem({ user }) {
  const { id, firstName, lastName, email, password } = user;

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="grid grid-cols-5 items-center gap-x-6 border-b border-zinc-200 p-4 last:border-b-0">
        <div className="text-sm text-zinc-600">{id}</div>
        <div className="text-sm text-zinc-600">{firstName}</div>
        <div className="text-sm text-zinc-600">{lastName}</div>
        <div className="text-zinc-600">{email}</div>
        {/* {password ? (
          <div className="font-medium text-green-700">{password}</div>
        ) : (
          <span>&mdash;</span>
        )} */}
        <div>
          <button>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button>
            <HiTrash />
          </button>
        </div>
      </div>
      {showForm && <CreateAccountForm />}
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
