import Header from "@/components/header";
import CreateAccount from "../components/forms/CreateAccount";
import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { useAppStore } from "@/state/store";

export default function Home() {
  return (
    <div>
      <CreateAccount />
    </div>
  );
}
