import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { Preview } from "@/components/Preview";
import { getChapters } from "@/actions/get-chapters";
import { VideoPlayer } from "@/components/videoplayer/VideoPlayer";
import { CourseEnrollButton } from "../../_components/CourseEnrollButton";

import { ArrowLeft } from "lucide-react";

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { courseId, chapterId } = params;

  const { chapter, course, nextChapter, purchase } = await getChapters({
    userId,
    chapterId,
    courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
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
          <h1 className="text-2xl font-bold my-5">{chapter?.title}</h1>
          <VideoPlayer videoUrl={chapter?.videoUrl} />
        </div>
        <div className="flex flex-col gap-5 w-full lg:w-[40%] h-auto">
          <h1 className="text-2xl font-bold">{chapter?.title}</h1>
          <Preview value={chapter?.description!} />
          {!purchase && (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
      </div>
    </div>
  );
}
