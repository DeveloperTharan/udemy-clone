"use client";

import React, { useRef } from "react";
import Link from "next/link";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { Coursecard } from "@/components/card";

interface CourseListProps {
  coursesData: {
    id: string;
    title: string;
    imageUrl: string | null;
    category: string | undefined;
    chapters: number;
    price: number | null;
  }[];
  purchased: {
    id: string;
    userId: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const CourseList = ({ coursesData, purchased }: CourseListProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200;
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute top-[40%] left-0 lg:-left-8 z-50 p-2 bg-gray-500 dark:bg-gray-800 rounded-full
        hidden lg:block"
        role="button"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </div>
      <div
        className="flex flex-row relative w-full h-fit flex-nowrap whitespace-nowrap
        overflow-x-auto scrollbar-hide gap-x-2 transition-all scroll-smooth"
        ref={sliderRef}
      >
        {coursesData.map((item, index) => (
          <div key={index} className="w-full">
            <Coursecard
              {...item}
              index={index}
              purchased={purchased.some((data) => data.courseId === item.id)}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute top-[40%] right-0 lg:-right-8 z-50 p-2 bg-gray-500 dark:bg-gray-800 rounded-full
        hidden lg:block"
        role="button"
        onClick={scrollRight}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};
