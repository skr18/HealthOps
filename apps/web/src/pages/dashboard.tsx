import RoleBased from "../components/RoleBased";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <RoleBased role="ADMIN">
        <button>Admin Panel</button>
      </RoleBased>

      <RoleBased role="DOCTOR">
        <button>Doctor Dashboard</button>
      </RoleBased>

      <RoleBased role="PATIENT">
        <button>Book Appointment</button>
      </RoleBased>
    </div>
  );
}