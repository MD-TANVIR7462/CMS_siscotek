"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Contact,
  Monitor,
  FileText,
  FolderOpen,
  ShoppingCart,
  Ticket,
  DollarSign,
  File,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

const navigation = [
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Contacts", href: "/contacts", icon: Contact },
  { name: "Equipment", href: "/equipment", icon: Monitor },
  { name: "Contracts", href: "/contracts", icon: FileText },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "Documents", href: "/documents", icon: File },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.custom((t) => (
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-zinc-900 text-sm border border-zinc-300 dark:border-zinc-700 px-4 py-3 rounded-lg shadow-lg w-full max-w-lg">
        <span className="text-zinc-900 dark:text-zinc-100">Are you sure you want to sign out?</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toast.dismiss(t);
              toast.info("Logout canceled.");
            }}
            className="px-3 py-1 rounded-md text-sm bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            No
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              dispatch(logout());
              toast.success("Signed out successfully.");
              router.push("/");
            }}
            className="px-2 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-10 w-10">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Header */}
          <div className="flex items-center  justify-between h-16  px-6 ">
            <h1 className="text-xl font-bold hidden md:block">CMS</h1>
            <ThemeToggle  />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout button fixed at bottom */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
