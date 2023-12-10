import { Outlet } from "react-router-dom";

import Settings from "../../components/Settings/Settings";

export default function SettingsLayOut() {
  return (
    <div className="mx-11 my-8 bg-white rounded-lg p-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-8">
          <Settings />
        </header>
        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
