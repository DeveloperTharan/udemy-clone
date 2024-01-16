import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Maincontent } from "./Maincontent";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const CourseData = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
      chapters: true,
      attachments: true,
      purchases: true,
    },
  });

  return (
    <div className="w-full h-full flex flex-col gapy-y-2 mt-5">
      <Link
        href={`/main`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6 ml-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      <div className="bg-[#2D2F31] w-full h-80 relative px-10 lg:px-20 py-10">
        <Maincontent
          
        />
      </div>
    </div>
  );
}
