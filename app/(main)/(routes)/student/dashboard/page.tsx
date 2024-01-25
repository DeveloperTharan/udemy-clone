import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { ArrowLeft } from "lucide-react";

import { CourseList } from "./_components/courseList";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const course = await db.course.findMany({
    where: {
      isPublished: true,
      purchases: {
        some: {
          userId,
        },
      },
    },
    include: {
      category: true,
      chapters: true,
    },
    orderBy: { id: "asc" },
  });

  return (
    <div className="w-full h-auto min-h-screen p-10">
      <Link
        href={`/`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      {course.length == 1 && (
        <h1 className="text-2xl font-semibold my-7">Your Purchased Courses.</h1>
      )}
      {course.length == 0 ? (
        <div className="flex justify-center">
          <div className="flex justify-center items-center text-xl text-gray-500">
            No courses are Purhased
          </div>
        </div>
      ) : (
        <CourseList
          coursesData={course.map((data) => ({
            id: data.id,
            title: data.title,
            imageUrl: data.imageUrl,
            category: data.category?.name,
            chapters: data.chapters.length,
            price: data.price,
          }))}
        />
      )}
    </div>
  );
}
