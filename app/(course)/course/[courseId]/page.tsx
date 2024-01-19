import React from "react";
import Link from "next/link";

import { db } from "@/lib/db";

import { Attachments } from "./_components/Attachments";
import { Maincontent } from "./_components/Maincontent";
import { ChaptersList } from "./_components/ChaptersList";

import { ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      attachments: true,
      purchases: true,
    },
  });

  if (!course) return redirect("/");

  const auther = await db.user.findUnique({
    where: {
      userId: course?.userId,
    },
  });

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
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
      <div className="bg-[#2D2F31] w-full h-auto min-h-80 relative px-10 lg:px-20 py-10">
        <Maincontent
          title={course?.title}
          description={course?.description}
          imageUrl={course?.imageUrl}
          price={course?.price}
          createdAt={course?.createdAt}
          updatedAt={course?.updatedAt}
          autherName={auther?.firstName + " " + auther?.lastName || ""}
          category={course?.category?.name}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full h-auto px-10 lg:px-20 py-10 gap-10">
        <div className="w-full lg:w-[70%]">
          <div className="w-full flex-flex-col justify-start items-center">
            <h1 className="text-2xl font-extrabold mb-6">Course Content</h1>
            <div className="flex flec-row gap-x-6 justify-start items-center mb-2">
              <p className="text-sm text-gray-600">
                {course?.chapters.length} Chapters
              </p>
              <p className="text-sm text-gray-600">
                {course?.attachments.length} Attachments
              </p>
            </div>
            <ChaptersList
              courseId={course.id}
              chapter={course.chapters.map((data) => ({
                id: data.id,
                title: data.title,
                isLocked: !data.isFree && !purchase,
              }))}
            />
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <div className="w-full flex-flex-col justify-start items-center">
            <h1 className="text-2xl font-extrabold mb-6">
              This course includes:(Attachments)
            </h1>
            <Attachments attachments={course.attachments.map((data) => ({
              id: data.id,
              title: data.name,
              url: data.url,
            }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
