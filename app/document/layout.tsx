import Header from "@/components/header";
import React from "react";

const Layout = ({ children }) => (
  <div>
    <Header />

    <div className="max-w-[1200px] m-auto">{children}</div>
  </div>
);

export default Layout;
