import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { VideoPlayer } from "@/components/videoplayer/VideoPlayer";

import { ArrowLeft } from "lucide-react";

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect(`/chapter/${params.courseId}`);
  }

  return (
    <div className="w-full h-auto min-h-screen flex flex-col gapy-y-2 p-10">
      <Link
        href={`/course/${params.courseId}`}
        className="flex items-center text-sm hover:opacity-75 transition mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Course
      </Link>
      <div className="flex flex-col lg:flex-row gap-10 justify-start items-center w-full h-auto">
        <div className="w-full lg:w-[60%] h-auto">
          <h1 className="text-2xl font-bold my-5">{chapter.title}</h1>
          <VideoPlayer videoUrl={chapter.videoUrl} />
        </div>
        <div className="w-full lg:w-[40%] h-auto">other</div>
      </div>
    </div>
  );
}
