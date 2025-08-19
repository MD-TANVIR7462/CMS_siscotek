"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { logout, useCurrentToken, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hooks";

import { useDispatch } from "react-redux";
import { getData } from "@/server/serverActions";
import CMSLoader from "@/components/shared/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const disPatch = useDispatch();

  const checkUser = async () => {
    try {
      if (token && user) {
        const response = await getData("/auth/register/me", token);
        if (!response.success) {
          setIsChecking(false);
          disPatch(logout());
        } else {
          router.replace("/customers");
        }
      } else {
        setIsChecking(false);
         router.replace("/login");
      }
    } catch (err) {
      router.replace("/login");
      return;
    }
  };

  useEffect(() => {
    checkUser();
  }, [router, token, user, disPatch]);

  if (isChecking) return <CMSLoader />;
}
