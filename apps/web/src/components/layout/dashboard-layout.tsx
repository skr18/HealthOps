import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar variant="dashboard" />

        <main className="flex-1 p-6 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

