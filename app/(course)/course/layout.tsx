import React from "react";

import { MainHeader } from "@/components/MainHeader";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-screen">
      <MainHeader />
      {children}
    </div>
  );
}
