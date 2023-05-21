import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "./footer";
import Nav from "./nav";

const Layout = ({ user, setUser }) => {
  return (
    <>
      <Nav user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
