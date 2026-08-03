import Link from "next/link";
import LogoutDashboard from "../_components/Sidebar";

const links = [
  { href: "/tenant-dashboard", label: "Overview" },
  { href: "/tenant-dashboard/rentals", label: "My Rentals" },
  { href: "/tenant-dashboard/payments", label: "My Payments" },
  { href: "/tenant-dashboard/reviews", label: "My Reviews" },
];

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full gap-8 py-8">
      <aside className="w-40 shrink-0 shadow-2xl h-full border-r-2 border-emerald-600 sticky top-0">
        <div>
          <h2 className="text-md font-black text-emerald-600 pl-2.5">
            RentNest -TENANT
          </h2>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <hr />
        <LogoutDashboard />
      </aside>
      <main className="flex-1 px-4">{children}</main>
    </div>
  );
}
