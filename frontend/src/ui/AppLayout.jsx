import { Outlet } from "react-router-dom";
import Header from "./Header";
import MainNav from "./MainNav";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <MainNav />
    </div>
  );
}

export default AppLayout;
