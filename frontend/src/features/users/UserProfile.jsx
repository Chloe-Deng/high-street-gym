// import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Loader from "../../ui/Loader";
import getStoredAuthKey from "../../utils/getStoredAuthKey";
import { useUser } from "../account/useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function UserProfile() {
  const userID = localStorage.getItem("userID");
  const authenticationKey = getStoredAuthKey();
  const { userData = {}, isLoading } = useUser(userID);
  const { firstName, lastName, email } = userData;

  const { isUpdating, updateUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
    },
  });

  const moveBack = useMoveBack();
  const handleClick = (e) => {
    e.preventDefault();
    moveBack();
  };

  if (isLoading) return <Loader />;

  const onSubmit = (data) => {
    // Check if there are any changes to the user data
    if (
      data.firstName === firstName &&
      data.lastName === lastName &&
      data.email === email &&
      !data.password // Assume that if the password field is empty, the user has not attempted to update the password
    ) {
      // Use toast to display a message that no change was detected
      toast(
        "No changes detected. Please update the fields before submitting.",
        {
          icon: "🔍",
        },
      );
    } else if (userData.id) {
      // if the update has detected and the user id is existed, update the data
      const payload = {
        user: {
          id: userData.id, // Ensure userData includes id
          ...data,
        },

        authenticationKey: authenticationKey,
      };
      updateUser(payload);
    } else {
      // If userData.id does not exist, this is an exception that needs to be handled here
      toast.error("User ID is missing. Unable to update user profile.");
    }
  };

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-6">
      <h1 className="px-4 text-xl font-bold sm:px-8 sm:text-2xl">
        Hello, {firstName}
      </h1>
      <form
        className="flex w-full flex-col gap-4 rounded-lg p-4 sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow error={errors?.firstName?.message}>
          <input
            className="input-square"
            type="text"
            name="firstName"
            placeholder="first name"
            defaultValue={firstName}
            disabled={isUpdating}
            {...register("firstName", {
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "First name must be fewer than 50 characters",
              },
              pattern: {
                value: /^[A-Za-z0-9\s'-]+$/,
                message:
                  "First name must only contain letters, numbers, spaces, or hyphens",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.lastName?.message}>
          <input
            className="input-square"
            type="text"
            name="lastName"
            placeholder="Last name"
            defaultValue={lastName}
            disabled={isUpdating}
            {...register("lastName", {
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters.",
              },
              maxLength: {
                value: 50,
                message: "Last name must be fewer than 50 characters.",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Last name must only contain letters.",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.email?.message}>
          <input
            className="input-square"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            disabled={isUpdating}
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Entered value does not match email format",
              },
            })}
          />
        </FormRow>

        <FormRow error={errors?.password?.message}>
          <input
            className="input-square"
            type="password"
            name="password"
            placeholder="Password"
            disabled={isUpdating}
            {...register("password")}
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
