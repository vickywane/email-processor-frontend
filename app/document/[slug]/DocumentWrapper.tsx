"use client";
import Button from "@/components/buttons";
import IntegrationLabel from "@/components/labels/IntegrationLabel";
import { AxiosClient } from "@/utils/AxiosClient";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoIosSync } from "react-icons/io";

const formatTitle = (title: string) => title.split("-").join(" ");

const DocumentWrapper = ({ docName }: { docName: string }) => {
  const [authToken, setAuthToken] = useState<null | "">(null);
  const [document, setDocument] = useState<null | Array<any>>(null);
  const [isLoading, setLoading] = useState(false);
  const [syncResult, setSyncResult] = useState({ status: "", message: "" });

  const authInstance = getAuth(firebaseApp);

  useEffect(() => {
    if (authToken) {
      (async () => await getDocumentData(docName))();
    }
  }, [authToken]);

  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  const getDocumentData = async (slug: string) => {
    const request = await AxiosClient({
      endpoint: `document?slug=${slug}`,
      authToken,
    });

    setDocument(request?.data);
  };

  const handleDataSync = async (documentId: string) => {
    setLoading(true);

    try {
      const syncRequest = await AxiosClient({
        endpoint: "sync",
        method: "POST",
        authToken,
        body: {
          documentId,
        },
      });

      setSyncResult({
        status: syncRequest?.data?.status,
        message: syncRequest?.data?.message,
      });
    } catch (error) {
      setSyncResult({
        status: "SYNC_ERROR",
        message:
          "Couldn't connect to ETA's services. Are you connected to the internet?",
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setSyncResult({ status: "", message: "" });
      }, 10000);
    }
  };

  return (
    <div className="max-w-[1100px] m-auto">
      <div className="flex flex-row justify-between my-4 ">
        <div className="flex items-center">
          <div className="flex flex-row">
            <div>
              <h1 className="text-2xl capitalize">{formatTitle(docName)}</h1>
            </div>

            <div className="ml-4 flex items-center">
              <IntegrationLabel label="google-spreadsheet" />
            </div>
          </div>
        </div>

        <div>
          <Button
            icon={<IoIosSync size={24} />}
            text={isLoading ? "Syncing" : "Sync"}
            clickAction={() => handleDataSync(docName)}
          />
        </div>
      </div>

      <hr />

      <br />

      {!document ? (
        <div>
          <h1 className="tex-xl text-center">
            Loading tracked application from{" "}
            <span className="font-semibold capitalize">
              {" "}
              {formatTitle(docName)}{" "}
            </span>{" "}
            document.
          </h1>
        </div>
      ) : document?.data?.length === 0 ? (
        <div>
          <h1 className="tex-xl text-center">
            <span className="font-semibold capitalize">
              {" "}
              {formatTitle(docName)}{" "}
            </span>{" "}
            document has no tracked applications.
          </h1>
        </div>
      ) : (
        <div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  {document?.tracking?.map((item, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {document?.data?.map((item, index) => (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div>
                        <p>{item?.companyName}</p>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div>
                        <p>{item?.dateApplied}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p>{item?.status}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p>{item?.companyName}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentWrapper;
