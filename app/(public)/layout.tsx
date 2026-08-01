import { PublicFooter } from "@/components/shared/footer";
import { PublicNavbar } from "@/components/shared/navbar";
import React from "react";

export default async function PublicHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />{" "}
      <main className="h-screen w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
