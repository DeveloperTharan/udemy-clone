import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { IconBadge } from "@/components/IconBadge";
import { TitleForm } from "./_components/TitleForm";
import { ImageForm } from "./_components/ImageForm";
import { CategoryForm } from "./_components/CategoryForm";
import { DescriptionForm } from "./_components/DescriptionForm";

import { LayoutDashboard } from "lucide-react";

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/main");

  const course = await db.course.findUnique({
    where: { id: params.courseId },
  });

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/main");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFIelds = requiredFields.length;
  const completedFields = requiredFields.filter((field) => field !== null);
  const completionText = `(${completedFields.length}/${totalFIelds})`;

  return (
    <div className="w-full h-auto min-h-screen p-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} size={"sm"} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course?.id} />
          <DescriptionForm initialData={course} courseId={course?.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={category.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
