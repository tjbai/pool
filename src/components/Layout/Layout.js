//@ts-check
import React from "react";
import Header from "./Header";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <>
      {asPath !== "/" && <Header />}
      <main>{children}</main>
    </>
  );
};
export default Layout;
