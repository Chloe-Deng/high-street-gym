import { NavLink } from "react-router-dom";

function NavListItem({ to, icon: Icon, label }) {
  return (
    <li className="flex items-center justify-center gap-1 px-2 py-1">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? "text-amber-500" : "hover:text-amber-500"
          }`
        }
      >
        <Icon className="text-grey-0 h-6 w-6" />
        <span className="text-xs">{label}</span>
      </NavLink>

      {/* <NavLink
        to={to}
        className="flex flex-col items-center gap-1 transition-all duration-300"
        children={({ isActive }) => (
          <>
            <Icon
              className={`h-6 w-6 transition-colors duration-300 ${
                isActive ? "text-amber-500" : "hover:text-amber-500"
              }`}
            />
            <span className="text-grey-0 text-xs">{label}</span>
          </>
        )}
      /> */}
    </li>
  );
}

export default NavListItem;
