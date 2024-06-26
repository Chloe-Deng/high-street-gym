// import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import getStoredAuthKey from "../../utils/getStoredAuthKey";
import { useUser } from "../account/useUser";
import { useUpdateUser } from "./useUpdateUser";
import Loader from "../../ui/Loader";
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useForm } from "react-hook-form";

function UserProfile() {
  const userID = localStorage.getItem("userID");

  const authenticationKey = getStoredAuthKey();
  const { userData = {}, isLoading } = useUser(userID);
  const { firstName, lastName, email } = userData;

  const { isUpdating, updateUser } = useUpdateUser();

  const moveBack = useMoveBack();
  const handleClick = (e) => {
    e.preventDefault();
    moveBack();
  };

  if (isLoading) return <Loader />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    // console.log("Updating field:", field, "Value:", value);

    if (!value) return;

    // Create an object with the user's id and the updated field
    const payload = {
      user: {
        id: userData.id, // The user's id
        [field]: value, // The updated value for the field
      },
      authenticationKey: authenticationKey, // The authentication key
    };

    updateUser(payload);
  }

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">
        Hello, {firstName}
      </h1>
      <form className="flex w-full flex-col gap-4 rounded-lg p-4 sm:p-8">
        <FormRow>
          <input
            className="input-square"
            type="text"
            name="firstName"
            placeholder="first name"
            defaultValue={firstName}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "firstName")}
            required
          />
        </FormRow>

        <FormRow>
          <input
            className="input-square"
            type="text"
            name="lastName"
            placeholder="Last name"
            defaultValue={lastName}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "lastName")}
          />
        </FormRow>

        <FormRow>
          <input
            className="input-square"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "email")}
          />
          {/* {errors.email && <p>{errors.email.message}</p>} */}
        </FormRow>

        <FormRow>
          <input
            className="input-square"
            type="password"
            name="password"
            placeholder="Password"
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "email")}
          />
        </FormRow>

        <div className="mt-6 flex justify-center space-x-2">
          <Button type="submit" variation="primary">
            Update
          </Button>
          <Button variation="secondary" onClick={handleClick}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
