"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "@/app/page";
import { getAuth } from "firebase/auth";
import { AxiosClient } from "@/utils/AxiosClient";
import Integrations from "../integrations";

const Onboarding = () => {
  const [authToken, setAuthToken] = useState<null | "">(null);
  const [userData, setUserData] = useState(null);

  const authInstance = getAuth(firebaseApp);

  useEffect(() => {
    if (authToken) {
      (async () => await getUserData())();
    }
  }, [authToken]);

  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  const getUserData = async () => {
    const request = await AxiosClient({
      endpoint: "user",
      authToken,
    });

    setUserData(request?.data);
  };

  const handleInstallationProcess = async () => {
    const request = await AxiosClient({
      endpoint: "installation",
      method: "POST",
      authToken,
    });

    window.open(request?.data?.data, "_blank");
  };

  return (
    <div className="max-w-[960px] m-auto">
      {!Object.hasOwn(userData?.data || {}, "googleTokens") && (
        <div>
          <button
            onClick={handleInstallationProcess}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Install Google Integration
          </button>
        </div>
      )}

      {Object.hasOwn(userData?.data || {}, "googleTokens") && <Integrations />}
    </div>
  );
};

export default Onboarding;
