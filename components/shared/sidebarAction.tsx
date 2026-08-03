"use client";
import { LogOut } from "lucide-react";

import { TokenPayload } from "@/lib/decode-jwt";
import { Button } from "../ui/button";

type Props = {
  user: TokenPayload | null;
  logoutAction: () => Promise<void>;
};

export function SidebarAction({ user, logoutAction }: Props) {
  return (
    <div className="py-2">
      <Button
        className="w-full bg-red-200 text-red-700 cursor-pointer hover:bg-red-400"
        onClick={() => logoutAction()}
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span className="font-semibold">Log out</span>
      </Button>
    </div>
  );
}
