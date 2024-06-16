"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { AxiosClient } from "@/utils/AxiosClient";
import IntegrationCard from "./IntegrationCard";
import { FiPlus } from "react-icons/fi";

import Link from "next/link";

const Integrations = () => {
  const [integrationData, setIntegrations] = useState<null | []>(null);
  const [authToken, setAuthToken] = useState<null | "">(null);

  const authInstance = getAuth(firebaseApp);
  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  useEffect(() => {
    if (authToken) {
      (async () => {
        await getUserIntegrations();
      })();
    }
  }, [authToken]);

  const getUserIntegrations = async () => {
    const request = await AxiosClient({
      endpoint: "integrate",
      authToken,
    });

    setIntegrations(request?.data);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          <p className="text-xl">All Tracked Documents</p>
        </div>

        <Link href={"/document/new"}>
          <button
            type="submit"
            className="text-white flex flex-row bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            <FiPlus size={26} />

            <div className="ml-2 mt-1 flex items-center">
              <p>Create Integration</p>
            </div>
          </button>
        </Link>
      </div>

      <br />
      <hr />
      <br />

      {integrationData && (
        <ul className="flex flex-col gap-12">
          {integrationData?.integrations?.map((integration: any, idx) => {
            return (
              <li key={idx}>
                <IntegrationCard integration={integration} />
              </li>
            );
          })}
        </ul>
      )}

      <br />
      <br />
    </div>
  );
};

export default Integrations;
