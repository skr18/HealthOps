import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface NavbarProps {
  variant?: "landing" | "dashboard";
}

export function Navbar({variant = "landing",}: NavbarProps) {

  const handleLogout = () => {
  localStorage.removeItem("token");

  dispatch(logout());

  navigate("/login", { replace: true });
  
};

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <Link to="/"
        className="text-2xl font-bold text-blue-600">
        HealthOps
      </Link>

      {variant === "landing" ? (
        <div className="flex gap-3">
          <Link to="/login">
            <Button>
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button>
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            Welcome
          </span>

          <Button onClick={handleLogout} >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}