import { Outlet } from "react-router-dom";

import UserServiceSide from "../../components/UserServiceSide/UserServiceSide";

export default function ServicesLayout() {
  return (
    <main className="p-10 flex gap-8 h-full">
      <UserServiceSide />
      <Outlet />
    </main>
  );
}
