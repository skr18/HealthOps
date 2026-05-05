import RoleBased from "../components/RoleBased";
import MainLayout from "../components/layout/mainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <h1>Welcome</h1>

      <RoleBased role="ADMIN">
        <button>Admin Analytics</button>
      </RoleBased>

      <RoleBased role="DOCTOR">
        <button>Doctor Appointments</button>
      </RoleBased>

      <RoleBased role="PATIENT">
        <button>Book Appointment</button>
      </RoleBased>
    </MainLayout>
  );
}
