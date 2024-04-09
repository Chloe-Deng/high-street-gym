import Button from "../../ui/Button";

function LoginForm() {
  return (
    <div className="mx-auto mt-20 max-w-3xl px-2">
      <h2 className="mb-8 text-center text-xl font-semibold">Login</h2>

      <form>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Username</label>
          <input className="input grow" type="text" />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Password</label>
          <input className="input grow" type="password" />
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <Button to="/classes" type="primary">
            Login
          </Button>
          <Button to="/sign_up" type="secondary">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
