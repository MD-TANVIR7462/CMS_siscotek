"use client";
import { Children, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/features/hooks";
import { logout, useCurrentToken, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { getData } from "@/server/serverActions";
import { toast } from "sonner";
import CMSLoader from "@/components/shared/Loader";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarCollapsed, setsideCollapsed] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const disPatch = useDispatch();

  const checkAuthorization = async () => {
    try {
      if (!token || !user) {
        disPatch(logout());
        router.replace("/login");
        return;
      } else {
        const response = await getData("/auth/register/me", token);
        if (!response.success) {
          toast.error("Please Login First!");
          disPatch(logout());
          router.replace("/login");
        } else {
          setIsAuthorized(true);
        }
      }
    } catch (err: any) {
      toast.error("Please Login Again!");
      disPatch(logout());
    } finally {
      setIsMounted(true);
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  if (!isMounted || !isAuthorized) {
    return <CMSLoader />;
  }

  return (
    <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setsideCollapsed} />
      {children}
    </div>
  );
};

export default DashboardLayout;
