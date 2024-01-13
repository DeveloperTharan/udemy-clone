"use client";

import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";
import React from "react";

export const IsTeacher = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user?.role !== "TEACHER") {
    return redirect("/main");
  }

  return <>{children}</>;
};
