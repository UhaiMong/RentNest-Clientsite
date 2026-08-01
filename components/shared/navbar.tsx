"use client";
import { Home, LayoutDashboard, LogOut, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
const navItems = [
  { label: "Home", href: "/", tab: "browse" as const },
  { label: "Properties", href: "/properties", tab: "browse" as const },
  { label: "About", href: "/about", tab: "browse" as const },
];

const userMenuItems = [
  { label: "Dashboard", action: "dashboard", icon: LayoutDashboard },
];

export function PublicNavbar() {
  const [activeTab, setActiveTab] = useState("");
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button className="shrink-0 flex items-center gap-2 cursor-pointer text-left">
            <span className="text-2xl font-black tracking-tight text-emerald-600">
              Rent Nest
            </span>
          </button>

          {/* Centered Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (setActiveTab) setActiveTab(item.tab);
                }}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.tab
                    ? "text-emerald-600 font-bold"
                    : "text-slate-600 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Dropdown / Auth */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <button
                  type="button"
                  {...props}
                  className="cursor-pointer outline-none rounded-full border-0 bg-transparent p-0"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center hover:bg-emerald-200/80 transition-colors">
                    <UserIcon className="w-5 h-5 text-emerald-700" />
                  </div>
                </button>
              )}
            />

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5 font-normal">
                    <p className="text-sm font-bold text-slate-900">Uhai</p>
                    <p className="text-xs text-slate-500 truncate">
                      uhai@gmail.com
                    </p>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded w-fit mt-1">
                      Landlord
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {userMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.action}>
                    <Icon className="w-4 h-4 mr-2 text-slate-500" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2 text-rose-500" />
                <span className="text-rose-600 font-semibold">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
