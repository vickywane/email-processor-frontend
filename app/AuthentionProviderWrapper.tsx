"use client";
import { ReactNode } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthenticationProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();

  const authInstance = getAuth(firebaseApp);
  authInstance?.onAuthStateChanged((user) => {
    if (!user) {
      router.push("/auth/sign-in");
    }
  });

  return <div>{children}</div>;
};

export default AuthenticationProviderWrapper;
