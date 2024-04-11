import { Link, NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className="flex flex-col items-center gap-4 px-1 pt-4 sm:flex sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:pt-4">
      <Link to="/" className="text-l font-bold tracking-widest text-zinc-50">
        High Street Gym Co.
      </Link>

      <ul className="flex flex-wrap items-center gap-5">
        <li>
          <NavLink
            className="text-l font-bold uppercase text-zinc-100 transition-all duration-300 hover:text-amber-600"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className="duration-30 text-l rounded-full bg-amber-500 px-4 py-1.5 font-bold uppercase text-zinc-700 transition-all hover:bg-amber-400"
            to="/sign_up"
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
