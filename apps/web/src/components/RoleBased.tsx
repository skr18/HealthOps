import { getUserFromToken } from "../utils/auth";

export default function RoleBased({
  role,
  children,
}: {
  role: string;
  children: any;
}) {
  const user = getUserFromToken();

  if (!user || user.role !== role) {
    return null;
  }

  return children;
}