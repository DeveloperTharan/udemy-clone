import React from "react";
import { CoursesList } from "../_components/CoursesList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TeacherInfo } from "../_components/TeacherInfo";

export default async function TeacherPage() {
  const { userId } = auth();

  if(!userId) return redirect("/") 

  const courses = await db.course.findMany({
    where: {
      userId,
      isPublished: true,
    },
    include: {
      category: true,
      chapters: true,
    },
    take: 10,
    orderBy: { id: "asc" },
  });

  const category = await db.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div className="flex w-full h-auto min-h-screen flex-col p-10 gap-20">
      <TeacherInfo/>
      <CoursesList category={category} courses={courses} />
    </div>
  );
}