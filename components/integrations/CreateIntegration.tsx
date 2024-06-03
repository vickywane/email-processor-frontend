"use client";
import React, { useState } from "react";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { AxiosClient } from "@/utils/AxiosClient";
import { useRouter } from "next/navigation";
import cn from "classnames";

const AVAILABLE_LABELS = [
  "Date Applied",
  "Job Name",
  "Description",
  "Link",
  "Status",
  "Company Name"
];

const CreateIntegration = () => {
  const [documentName, setDocumentName] = useState("");
  const [authToken, setAuthToken] = useState<null | "">(null);
  const [selectedLabels, setSelectedLabels] = useState<[] | string[]>([]);

  const authInstance = getAuth(firebaseApp);
  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  const router = useRouter();

  const startIntegration = async () => {
    await AxiosClient({
      endpoint: "integrate",
      method: "POST",
      authToken,
      body: {
        name: documentName,
        columns: selectedLabels,
      },
    });

    router.push("/dashboard");
  };

  const selectLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels((items) => items.filter((item) => item !== label));

      return;
    }

    setSelectedLabels((items) => [...items, label]);
  };

  return (
    <div className="px-8">
      <div>
        <div className="my-6">
          <label
            htmlFor="name"
            className="
            font-semibold block mb-2 text-sm font-medium text-gray-900"
          >
            Document Name
          </label>
          <input
            name="name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="My Applications Tracker"
            required
          />
        </div>
      </div>

      <div>
        <p className="font-semibold">Document Column Headers</p>
        <br />

        <div>
          <ul className="flex flex-row gap-8">
            {AVAILABLE_LABELS.map((label, idx) => (
              <li key={idx}>
                <div
                  onClick={() => selectLabel(label)}
                  className={cn(
                    "px-4 hover:cursor-pointer py-2 border-2 rounded-lg border-red",
                    selectedLabels.includes(label) && "bg-red-100"
                  )}
                >
                  <p className="text-sm"># {label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* {integrations && ( */}

      <br />
      <div>
        <button
          onClick={startIntegration}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Create Integration
        </button>
      </div>
      {/* )} */}

      <br />
    </div>
  );
};

export default CreateIntegration;
