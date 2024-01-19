import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import { ArrowLeft } from "lucide-react";
import { getChapter } from "@/actions/get-chapter";
import { VideoPlayer } from "./_components/VideoPlayer";
import { Preview } from "@/components/Preview";
import { Spacer } from "@nextui-org/react";

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { chapter, course, muxData, nextChapter, purchase } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    return redirect("/main");
  }

  const isLocked = !chapter.isFree && !purchase;

  return (
    <div className="w-full h-auto min-h-screen flex flex-col gapy-y-2 mt-5">
      <Link
        href={`/course/${params.courseId}`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6 ml-10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            title={chapter.title}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
          </div>
          <Spacer />
          <div>
            <Preview value={chapter.description!} />
          </div>
        </div>
      </div>
    </div>
  );
}
