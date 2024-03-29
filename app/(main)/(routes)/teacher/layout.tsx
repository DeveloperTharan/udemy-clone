import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function TeacherPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const user = await db.user.findUnique({
    where: { userId },
  });

  if (user?.role !== "TEACHER") {
    return redirect("/");
  }

  return (
    <>
      {children}
    </>
  );
}
