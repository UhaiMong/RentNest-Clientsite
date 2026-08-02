import { getAdminStats } from "./_actions/adminActions";
import { Users, Home, FileText, DollarSign, QuoteIcon } from "lucide-react";

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Total Users", value: stats.total_user, icon: Users },
    {
      label: "Total Active Users",
      value: stats.total_active_user,
      icon: Users,
    },
    { label: "Total Properties", value: stats.total_property, icon: Home },
    { label: "Total Rentals", value: stats.total_rental, icon: FileText },
    { label: "Total Reviews", value: stats.total_review, icon: QuoteIcon },
    {
      label: "Total Revenue",
      value: `$${stats.total_revenue ?? 0}`,
      icon: DollarSign,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Admin Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border p-4">
            <c.icon className="size-5 text-muted-foreground" />
            <p className="mt-2 text-2xl font-semibold">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
