"use client";

import { firebaseApp } from "@/utils/firebase";
import { AxiosClient } from "@/utils/AxiosClient";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const IntegrationCard = ({ integration }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const authInstance = getAuth(firebaseApp);
  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  const handleDataSync = async (documentId: string) => {
    setLoading(true);

    await AxiosClient({
      endpoint: "sync",
      method: "POST",
      authToken,
      body: {
        documentId,
      },
    });

    setLoading(false);
  };

  if (!integration) return null;

  return (
    <div className="h-[350px] p-6 border-2 w-full">
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-2xl font-medium"> {integration?.documentName} </p>
          <p className="text-medium pt-2">
            {new Date(integration?.dateCreated).toDateString()}
          </p>
        </div>

        <div>
          <button
            onClick={() => handleDataSync(integration?.documentId)}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            {isLoading ? "Syncing" : "Sync"} Data
          </button>
        </div>
      </div>
      <br />
      <hr />
      <br />

      <div>{JSON.stringify(integration)}</div>

      <br />
      <hr />
      <br />
      <ul className="flex flex-row gap-6">
        {integration?.tracking?.map((item, idx) => {
          return (
            <li key={idx}>
              <div className="bg-gray-500 py-2 px-4 rounded-xl">
                <p className="text-white text-sm"> #-{item} </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IntegrationCard;
