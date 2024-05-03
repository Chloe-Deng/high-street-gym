import { NavLink } from "react-router-dom";

function NavListItem({ to, icon: Icon, label }) {
  return (
    <li className="flex items-center justify-center gap-1 px-2 py-1">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex cursor-pointer flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? "text-amber-500" : "hover:text-amber-500"
          }`
        }
      >
        <Icon className="text-grey-0 h-6 w-6" />
        <span className="text-xs">{label}</span>
      </NavLink>
    </li>
  );
}

export default NavListItem;
