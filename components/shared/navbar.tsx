"use client";
import { Home, LayoutDashboard, LogOut, Menu, UserIcon, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Register", href: "/register" },
];

const userMenuItems = [
  { label: "Dashboard", action: "dashboard", icon: LayoutDashboard },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 cursor-pointer text-left"
          >
            <span className="text-2xl font-black tracking-tight text-emerald-600">
              <Image
                src="/rentnest.png"
                alt="RentNest logo"
                width={56}
                height={56}
                className="object-cover object-center w-full"
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors cursor-pointer",
                    isActive ? "bg-emerald-600 text-white rounded-xl px-1" : "",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Dropdown / Auth */}
          <div className="flex justify-start items-center gap-x-2.5">
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
            {/* Mobile menu  */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="md:hidden">
                <button
                  className={cn(
                    "transition-colors duration-200",
                    "text-brand bg-white",
                  )}
                  aria-label="Open menu"
                >
                  {open ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 pt-6">
                <SheetTitle className={"hidden"}>Navigate Menu</SheetTitle>
                <SheetDescription className={"hidden"}>
                  Access admin dashboard links
                </SheetDescription>
                {/* Sheet Logo */}
                <div className="flex items-center gap-2.5 mb-8 px-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md">
                    <Image
                      className="w-full h-full object-cover"
                      src="/rentnest.png"
                      alt="Rentnest logo"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>

                {/* Sheet Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navItems.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === href
                          ? "bg-[#eef0ff] text-[#2e318f]"
                          : "text-slate-600 hover:bg-slate-50",
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
