import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useRegisterUser } from "./useRegisterUser";
import FormRowRound from "../../ui/FormRowRound";

function SignUpForm() {
  const { isRegistering, registerUser } = useRegisterUser();

  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    registerUser(data, {
      onSuccess: (data) => {
        console.log(data);
        reset();
      },
    });
  }

  return (
    <div className="mx-auto mt-20 max-w-3xl px-2">
      <h2 className="mb-8 text-center text-xl font-semibold">Sign up</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRowRound label="First name" error={errors?.firstName?.message}>
          <input
            className="input grow"
            type="text"
            id="firstName"
            disabled={isRegistering}
            {...register("firstName", {
              required: "First name field is required",
            })}
          />
        </FormRowRound>

        <FormRowRound label="Last name" error={errors?.lastName?.message}>
          <input
            className="input grow"
            type="text"
            id="lastName"
            disabled={isRegistering}
            {...register("lastName", {
              required: "Last name field is required",
            })}
          />
        </FormRowRound>

        {/* <FormRowRound label="Phone number" error={errors?.phoneNumber?.message}>
          <input
            className="input grow"
            type="number"
            id="phoneNumber"
            disabled={isRegistering}
            {...register("phoneNumber", {
              required: "Phone number field is required",
            })}
          />
        </FormRowRound> */}

        <FormRowRound label="Email" error={errors?.email?.message}>
          <input
            className="input grow"
            type="email"
            id="email"
            disabled={isRegistering}
            {...register("email", {
              required: "Email field is required",
            })}
          />
        </FormRowRound>

        <FormRowRound label="Password" error={errors?.password?.message}>
          <input
            className="input grow"
            type="password"
            id="password"
            disabled={isRegistering}
            {...register("password", {
              required: "Password field is required",
            })}
          />
        </FormRowRound>

        <div className="mt-10 flex justify-center gap-3">
          <Button disabled={isRegistering} variation="primary">
            Sign up
          </Button>
          <Button type="reset" variation="secondary">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
