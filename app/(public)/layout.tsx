import React from "react";

export default async function PublicHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      {" "}
      <h1>Navbar is here</h1> {children}
      <h1>Footer is here</h1>
    </div>
  );
}
