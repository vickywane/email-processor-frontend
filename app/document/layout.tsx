import Header from "@/components/header";
import React, { ReactNode } from "react";
import AuthenticationProviderWrapper from "../AuthentionProviderWrapper";

const Layout = ({ children }: { children: ReactNode }) => (
  <AuthenticationProviderWrapper>
    <div>
      <Header />

      <div className="max-w-[1200px] m-auto">{children}</div>
    </div>
  </AuthenticationProviderWrapper>
);

export default Layout;
