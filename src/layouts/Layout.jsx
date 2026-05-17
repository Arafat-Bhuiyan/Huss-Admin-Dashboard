import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="w-10/12 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
