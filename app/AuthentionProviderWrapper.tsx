"use client";
import { ReactNode, useEffect } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthenticationProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const authInstance = getAuth(firebaseApp);
      authInstance?.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/auth/sign-in");
        }
      });
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthenticationProviderWrapper;
