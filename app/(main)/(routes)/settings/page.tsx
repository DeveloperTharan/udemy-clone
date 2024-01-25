import React from "react";
import { Settings } from "./_components/settings";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SettingsPage() {
  const { userId } = auth();

  if (!userId) redirect("/");

  const userData = await db.user.findUnique({
    where: { userId },
  });

  return (
    <div className="w-full h-auto min-h-screen px-10 lg:px-32 py-10">
      <Link
        href={`/`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      <Settings initialData={userData} />
    </div>
  );
}
