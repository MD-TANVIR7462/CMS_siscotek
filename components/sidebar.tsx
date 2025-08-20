"use client";

import React, { useState, useEffect } from "react";
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

  PanelLeftClose,
  PanelLeftOpen,
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

export function Sidebar({ isCollapsed, setIsCollapsed }: {isCollapsed:boolean, setIsCollapsed: any }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Check if device is mobile on initial render and resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
        setIsCollapsed(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const sidebarWidth = isCollapsed ? "w-16" : "w-64";
  const sidebarTranslate = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleSidebar} className="h-10 w-10">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Desktop collapse button */}
      

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r border-border transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isMobile ? `w-64 ${sidebarTranslate}` : `${sidebarWidth} translate-x-0`
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn("flex items-center justify-between h-16 px-4", isCollapsed && "flex-col justify-center")}>
            <h1 className={cn("text-xl font-bold", isCollapsed ? "hidden" : "block")}>CMS</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8"
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileSidebar}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors group",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-14 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout button fixed at bottom */}
          <div className={cn("p-4 border-t border-border", isCollapsed && "flex justify-center")}>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className={cn("w-full flex items-center justify-center gap-2", isCollapsed && "w-10 px-0")}
              title={isCollapsed ? "Logout" : ""}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeMobileSidebar} />}

      {/* Main content margin adjustment */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isMobile ? "lg:ml-0" : isCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      />
    </>
  );
}
