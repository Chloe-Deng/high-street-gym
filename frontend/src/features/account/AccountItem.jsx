import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
// import Loader from "../../ui/Loader";
// import { useUser } from "./useUser";

function AccountItem() {
  const { user } = useAuth();
  const { firstName, lastName, email } = user;

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">
        Hello, {firstName}
      </h1>
      <form className="flex w-full flex-col gap-4 rounded-lg p-4 sm:p-8">
        <div className="flex flex-col">
          {/* <label className="text-base" htmlFor="firstName">
            First name
          </label> */}
          <input
            className="input-square"
            type="text"
            name="firstName"
            placeholder="First name"
            defaultValue={firstName}
            required
          />
        </div>

        <div className="flex flex-col">
          <input
            className="input-square"
            type="text"
            name="lastName"
            placeholder="Last name"
            defaultValue={lastName}
            required
          />
        </div>

        {/* <div className="flex flex-col">
          <input
            className="input-square"
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={email}
            required
          />
        </div> */}

        <FormRow>
          <input
            className="input-square"
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={email}
            required
          />
        </FormRow>

        <div className="mt-6 flex justify-center space-x-2">
          <Button variation="primary">Update</Button>
          <Button variation="secondary" to="/">
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountItem;
