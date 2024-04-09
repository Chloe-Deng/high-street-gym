import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav className="flex items-center justify-end">
      <ul className="flex items-center gap-5 pr-2 pt-3">
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
