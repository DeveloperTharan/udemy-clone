"use client";

import React from "react";
import Link from "next/link";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BookOpen } from "lucide-react";

interface CourseListProps {
  coursesData: {
    id: string;
    title: string;
    imageUrl: string | null;
    category: string | undefined;
    chapters: number;
    price: number | null;
    purchased: string[] | null;
  }[];
}

export const CourseList = ({ coursesData }: CourseListProps) => {
  return (
    <div className="flex flex-row relative w-full h-fit flex-nowrap whitespace-nowrap 
    overflow-x-auto scrollbar-default gap-x-2">
      {coursesData.map((item, index) => (
        <Link href={`/course/${item.id}`} key={item.id}>
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
            className="border dark:border-0"
          >
            <CardBody className="overflow-visible p-2 w-full">
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
              <p className="text-default-500 italic">{item.category}</p>
              <div className="flex flex-row my-2 items-center justify-between w-full">
                <div className="flex flex-row items-center space-x-3">
                  <BookOpen className="h-7 w-7 bg-green-600/20 text-green-600 p-1.5 rounded-md" />
                  <span className="text-default-500">
                    {item.chapters} chapters
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  {item.price !== null && (
                    <span className="text-default-500 italic mr-2">Price</span>
                  )}
                  {item.price !== null ? (
                    <>
                      {item.purchased !== null ? (
                        <span>${item.price}</span>
                      ) : (
                        "Paid"
                      )}
                    </>
                  ) : (
                    "FREE"
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
