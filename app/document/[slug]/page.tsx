import Header from "@/components/header";
import { AxiosClient } from "@/utils/AxiosClient";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import DocumentWrapper from "./DocumentWrapper";

const Page = async ({ params }) => {
  return (
    <div>
      <Header />

      <DocumentWrapper docName={params?.slug} />
    </div>
  );
};

export default Page;
