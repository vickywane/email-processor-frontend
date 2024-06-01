"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "@/app/page";
import { getAuth } from "firebase/auth";
import { AxiosClient } from "@/utils/AxiosClient";
import IntegrationCard from "./IntegrationCard";
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
      {/* {integrations && ( */}
      <div className="flex flex-row justify-between">
        <div className="flex items-center" >
          <p className="text-xl">All Tracked Documents</p>
        </div>

        <Link href={"/new-document"}>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Create Integration
          </button>
        </Link>
      </div>

      {/* )} */}
      <br />
      <hr />
      <br />

      {integrationData && (
        <ul className="flex flex-col gap-12" >
          {integrationData?.integrations?.map((integration: any, idx) => {
            return (
              <li key={idx}>
                <IntegrationCard integration={integration} />
              </li>
            );
          })}
        </ul>
      )}

      {/* <div>
          <button
            onClick={getUserIntegrations}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Refresh Integrations
          </button>
        </div> */}

      <br />

      <br />

      {/* <div>
          <button
            onClick={getUserIntegrations}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Sync Data
          </button>
        </div> */}
    </div>
  );
};

export default Integrations;
