import React from "react";

import { SideBar } from "./_components/SideBar";
import { NavBar } from "./_components/NavBar";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-0 lg:w-64 h-full fixed top-0 left-0 min-h-screen overflow-y-auto">
        <SideBar />
      </div>
      <div className="w-full h-full min-h-screen lg:ml-64">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
