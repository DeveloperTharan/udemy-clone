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
}

export const CourseList = ({ coursesData }: CourseListProps) => {
  return (
    <div
      className="flex flex-row justify-start items-start flex-wrap gap-5"
    >
      {coursesData.map((item, index) => (
        <Coursecard
        {...item}
        index={index}
      />
      ))}
    </div>
  );
};
