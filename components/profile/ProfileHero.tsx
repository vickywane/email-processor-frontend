"use client";
import React, { useState } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IntegrationLabel from "../labels/IntegrationLabel";
import SkeletonLoader from "../ui/SkeletonLoader";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dkfptto8m/image/upload/v1718488139/profile-image-fallback.jpg";

const ProfileHero = () => {
  const [user, setUser] = useState(null);

  const authInstance = getAuth(firebaseApp);
  authInstance?.onAuthStateChanged((user) => setUser(user));

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authInstance.signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!user) {
    return <SkeletonLoader />;
  }

  return (
    <div className="px-8 max-w-[1200px] m-auto">
      <div>
        <div className="flex flex-row">
          <div className="relative h-[180px] w-[180px] ">
            <Image
              src={user?.photoURL || FALLBACK_IMAGE}
              alt={user?.email}
              fill
              className="absolute rounded-full"
            />
          </div>

          <div className="flex justify-center ml-6 flex-col" >
            <p className="text-2xl"> {user?.displayName} </p>
            <p className="text-xl"> {user?.email} </p>
          </div>
        </div>

        <div className="w-fit">
          <IntegrationLabel label={user?.providerData[0]?.providerId} />
        </div>

        <br />
      </div>

      <div className="p-4 border-2 mb-12">
        <p className="text-xl">Integrations</p>
      </div>

      <button
        type="submit"
        onClick={handleLogout}
        className="text-white bg-[red] hover:bg-[red] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileHero;
