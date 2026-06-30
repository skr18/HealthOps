import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  Pill,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/routes/route-paths";
import type { UserRole } from "@/types/auth";

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const menuByRole: Record<UserRole, MenuItem[]> = {
  ADMIN: [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Doctors",
      path: ROUTES.doctors,
      icon: Stethoscope,
    },
    {
      label: "Patients",
      path: ROUTES.patients,
      icon: Users,
    },
    {
      label: "Appointments",
      path: ROUTES.appointments,
      icon: CalendarDays,
    },
    {
      label: "Medicines",
      path: ROUTES.medicines,
      icon: Pill,
    },
    {
      label: "Settings",
      path: ROUTES.settings,
      icon: Settings,
    },
  ],

  DOCTOR: [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Appointments",
      path: ROUTES.appointments,
      icon: CalendarDays,
    },
  ],

  PATIENT: [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Doctors",
      path: ROUTES.doctors,
      icon: Stethoscope,
    },
    {
      label: "Appointments",
      path: ROUTES.appointments,
      icon: CalendarDays,
    },
  ],
};