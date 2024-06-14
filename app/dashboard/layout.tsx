import { firebaseApp } from "@/utils/firebase";
import { getAuth } from "firebase/auth";

const Layout = ({ children }: { children: any }) => {
  console.log("DASHBOARD PAGE COMPONENT =>");

  const authInstance = getAuth(firebaseApp);

  authInstance?.onAuthStateChanged((user) => {
    console.log("PAGE AUTH STATE CHANGED =>", user);

    // useAppStore((state) => state.modifyUserToken(user?.token))
  });

  return <div>{children}</div>;
};

export default Layout;
