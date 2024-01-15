"use client";

import React from "react";

import { Course, Chapter } from "@prisma/client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseListProps {
  courses: Course[];
  chapters: Chapter[];
  category: { id: string; name: string }[];
}

export const CourseList = ({
  courses,
  category,
  chapters,
}: CourseListProps) => {
  const CategoryFilter = (id: string) => {
    const res = category.filter((category) => category.id === id);

    return res[0]?.name;
  };

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {courses.map((item, index) => (
        <Link href={`/course/${item.id}`}>
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-2">
            <Image
              shadow="sm"
              radius="lg"
              alt={item.title}
              className="w-[280px] object-cover h-[230px]"
              src={item.imageUrl ?? ""}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col gap-y-1 justify-start items-start">
            <b>{item.title}</b>
            <p className="text-default-500 italic">
              {CategoryFilter(item.categoryId ?? "")}
            </p>
            <div className="flex flex-row my-2 items-center space-x-3">
              <BookOpen className="h-7 w-7 bg-green-600/20 text-green-600 p-1.5 rounded-md" />
              <span className="text-default-500">
                {
                  chapters.filter((chapter) => chapter.courseId == item.id)
                    .length
                } chapters
              </span>
            </div>
          </CardFooter>
        </Card></Link>
      ))}
    </div>
  );
};
