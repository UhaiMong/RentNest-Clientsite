import { PublicFooter } from "@/components/shared/footer";
import React from "react";
import Navbar from "./_components/Navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />{" "}
      <main className="h-screen w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
