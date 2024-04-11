import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";

function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin2@email.com");
  const [password, setPassword] = useState("pass1234");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/classes", { replace: true });
    },
    [navigate, isAuthenticated],
  );

  return (
    <div className="mx-auto mt-20 max-w-3xl px-2">
      <h2 className="mb-8 text-center text-xl font-semibold">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
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
        </div>

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
