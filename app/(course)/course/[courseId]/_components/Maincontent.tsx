"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { CourseEnrollButton } from "./CourseEnrollButton";

import { Button, Image } from "@nextui-org/react";

import { AlertOctagon } from "lucide-react";

interface MaincontentProps {
  id: string;
  title: string | undefined | null;
  description: string | undefined | null;
  imageUrl: string | undefined | null;
  price: number | undefined | null;
  createdAt: Date | undefined | null;
  updatedAt: Date | undefined | null;
  autherName: string | undefined | null;
  category: string | undefined | null;
  purchases: {
    id: string;
    userId: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  chapterId: string | undefined | null;
}

export const Maincontent = ({
  id,
  title,
  description,
  imageUrl,
  price,
  createdAt,
  updatedAt,
  category,
  autherName,
  purchases,
  chapterId,
}: MaincontentProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const router = useRouter();

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-y-10 justify-center lg:justify-between items-start w-full">
      <div className="flex flex-col justify-center items-start space-y-4 w-full lg:w-[65%] mx-auto">
        <div className="text-[18px] text-purple-600 font-semibold">
          {category}
        </div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm font-normal italic text-gray-400">
          {description}
        </p>
        <div className="text-sm text-white">
          Created by{" "}
          <span className="text-purple-600 underline">{autherName}</span>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <AlertOctagon className="h-4 w-4 text-white" />
          <span className="text-xs text-white">
            Created At - {formatDate(createdAt as unknown as number)}
          </span>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <AlertOctagon className="h-4 w-4 text-white" />
          <span className="text-xs text-white">
            Udated At - {formatDate(updatedAt as unknown as number)}
          </span>
        </div>
        <div className="lg:hidden w-full">
          {!purchases && <CourseEnrollButton courseId={id} price={price!} />}
          {purchases && (
            <Button
              size="md"
              variant="solid"
              className="w-full text-white bg-purple-700 lg:hidden"
              onClick={() => router.push(`/course/${id}/chapter/${chapterId}`)}
            >
              Whatch Now
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 w-full lg:w-[35%]">
        <Image
          src={imageUrl!}
          alt="product"
          className="w-[100vh] lg:w-96 h-96 lg:h-52 object-cover"
        />
        <div className="hidden lg:block w-96">
          {!purchases && <CourseEnrollButton courseId={id} price={price!} />}
          {purchases && (
            <Button
              size="md"
              variant="solid"
              className="w-full text-white bg-purple-700"
              onClick={() => router.push(`/course/${id}/chapter/${chapterId}`)}
            >
              Whatch Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
