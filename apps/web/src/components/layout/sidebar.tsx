import { NavLink } from "react-router-dom";

import { menuByRole } from "../navigation/menu-config";

import { useAppSelector } from "../../app/hooks";

export function Sidebar() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  const menuItems = menuByRole[user.role];

  return (
    <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold tracking-wide">
          HealthOps
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Healthcare Management
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-4 py-3
                transition-all duration-200

                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
                `
              }
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}