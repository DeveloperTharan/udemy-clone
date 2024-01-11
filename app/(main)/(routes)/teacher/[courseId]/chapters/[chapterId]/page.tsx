import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { IconBadge } from "@/components/IconBadge";

import { ChapterTitleForm } from "./_components/ChapterTitleForm";
import { ChapterVideoForm } from "./_components/ChapterVideoForm";
import { ChapterAccessForm } from "./_components/ChapterAccessForm";
import { ChapterDescriptionForm } from "./_components/ChapterDescriptionForm";

import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

export default async function ChapterId({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="w-full h-auto min-h-screen p-10">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size={"sm"} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} size={"sm"} />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} size={"sm"} />
            <h2 className="text-xl">Add a video</h2>
          </div>
          <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
        </div>
      </div>
    </div>
  );
}
