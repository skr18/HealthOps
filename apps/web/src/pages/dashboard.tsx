import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { useAppSelector } from "@/app/hooks";

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user,);
  if (!user) {
    return null;
  }
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Healthcare operations overview"
      />

      <Card>
        <h2 className="text-xl font-semibold">
          Welcome, {user.email}
        </h2>

        <p className="mt-2 text-slate-600">
          HealthOps platform is running successfully.
        </p>
      </Card>
      
    </>
  );
}

