import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormRowRound from "../../ui/FormRowRound";

function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // admin
      email: "chloe@email.com", 
      password: "pass1234", 
    },
  });

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  // const [email, setEmail] = useState("chloe@email.com");
  // const [password, setPassword] = useState("pass1234");

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (email && password) login(email, password);
  // }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/classes", { replace: true });
    },
    [navigate, isAuthenticated],
  );

  return (
    <div className="mx-auto mt-20 max-w-3xl px-2">
      <h2 className="mb-8 text-center text-xl font-semibold">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRowRound label="Email" error={errors?.email?.message}>
          <input
            className="input grow"
            type="email"
            id="email"
            {...register("email", {
              required: "Email field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Your email address does not match email format!",
              },
            })}
          />
        </FormRowRound>

        <FormRowRound label="Password" error={errors?.password?.message}>
          <input
            className="input grow"
            type="password"
            id="password"
            {...register("password", {
              required: "Password field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters!",
              },
            })}
          />
        </FormRowRound>

        {/* <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="email" className="sm:basis-40">
            Email
          </label>
          <input
            className="input grow"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="password">
            Password
          </label>
          <input
            className="input grow"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div> */}

        <div className="mt-10 flex justify-center gap-3">
          <Button variation="primary">Login</Button>
          <Button to="/sign_up" variation="secondary">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
