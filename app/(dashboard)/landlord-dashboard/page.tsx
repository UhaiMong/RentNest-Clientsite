import { getCurrentUser } from "@/lib/session";

export default async function LandlordOverviewPage() {
  const user = await getCurrentUser();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome, {user?.email}</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your properties and review tenant requests from the sidebar.
      </p>
    </div>
  );
}
