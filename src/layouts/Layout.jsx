import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#FAF8F2]">
        <Outlet />
      </div>
    </div>
  );
};
