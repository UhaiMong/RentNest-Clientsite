import { Home, Search, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About RentNest
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          RentNest is a modern, responsive rental property marketplace built to
          seamlessly connect landlords, tenants, and administrators. Our
          platform simplifies the entire rental journey from browsing to secure
          payments.
        </p>
      </div>

      {/* Features / Roles Section */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tenants */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Search className="size-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">For Tenants</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Find your perfect home easily. Tenants can browse listings with
            advanced filtering, submit rental requests directly to landlords,
            and complete secure payments all in one place.
          </p>
        </div>

        {/* Landlords */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Home className="size-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            For Landlords
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Manage your properties effortlessly. Landlords can list new
            properties, update availability, and seamlessly approve or reject
            rental requests via an intuitive, dedicated dashboard.
          </p>
        </div>

        {/* Admins */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            For Administrators
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Keep the community safe and running smoothly. Admins oversee the
            entire platform through a comprehensive moderation dashboard,
            ensuring a high-quality experience for everyone.
          </p>
        </div>
      </div>

      {/* Tech Stack / Bottom Section */}
      <div className="mt-20 rounded-2xl bg-secondary/50 px-6 py-10 text-center sm:px-12">
        <h3 className="text-lg font-medium text-foreground">
          Powered by Modern Web Technologies
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Built with Next.js, React, and Tailwind CSS to deliver a blazing-fast,
          responsive experience across all devices.
        </p>
      </div>
    </main>
  );
}
