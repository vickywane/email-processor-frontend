"use client";
import React, { useState } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8">
      {JSON.stringify(user)}

      <p className="text-xl"> {user?.email} </p>
      <br />

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
