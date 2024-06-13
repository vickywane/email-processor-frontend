import Header from "@/components/header";
import { AxiosClient } from "@/utils/AxiosClient";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const getData = async (docName: string) => {
  // const request = await AxiosClient({
  //   endpoint: "/document",
  //   authToken: "",
  // });

  // return request?.data;
};

const Page = async ({ params }) => {
  const authInstance = getAuth(firebaseApp);

  const [authToken, setAuthToken] = useState<null | "">(null);


  authInstance?.onAuthStateChanged((user) => setAuthToken(user?.accessToken));

  console.log("authInstance", authToken);

  // const { data } = await getData(params?.slug);

  return (
    <div>
      <Header />

      <h1> DOCUMENT PAGE HERE </h1>
    </div>
  );
};

export default Page;
