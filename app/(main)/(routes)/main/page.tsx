import React from "react";

import { db } from "@/lib/db";
import { Category } from "./_components/Category";
import { Carousel } from "./_components/Carousel";
import { CourseList } from "./_components/CourseList";

export default async function Main() {
  const course = await db.course.findMany({
    where: {
      isPublished: true,
    },
    take: 10,
  });

  const category = await db.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  const chapters = await db.chapter.findMany();

  return (
    <div className="flex flex-col w-full h-auto min-h-screen">
      <Category
        category={category.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
      <Carousel />
      <div className="flex flex-col space-y-6 px-5 lg:px-16">
        <h1 className="text-4xl font-extrabold">What to learn next</h1>
        <div className="flex flex-col gap-y-4 justify-start items-start">
          <h4 className="text-2xl font-semibold">
            Recomended for you!{" "}
            <span className="text-blue-700 underline">
              "learn and grow your skill's!!!"
            </span>
          </h4>
          <CourseList
            courses={course}
            chapters={chapters}
            category={category.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
