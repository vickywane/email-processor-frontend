import React from "react";
import CreateIntegration from "../../components/Onboarding";
import Header from "@/components/header";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/utils/firebase";
import { useAppStore } from "@/state/store";

const Page = async () => {
 

  return (
    <div>
      <div>
        <Header />

        <br />

        <CreateIntegration />
      </div>
    </div>
  );
};

export default Page;
