import React from "react";

import { BookOpen } from "lucide-react";

import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";

interface CourseListProps {
  id: string;
  index: number;
  title: string;
  price: number | null;
  imageUrl: string | null;
  category: string | undefined;
  chapters: number;
  purchased?: boolean;
}

export const Coursecard = ({
  id,
  index,
  title,
  price,
  category,
  chapters,
  imageUrl,
  purchased,
}: CourseListProps) => {
  return (
    <Link href={`/course/${id}`} key={id}>
      <Card
        shadow="sm"
        key={index}
        isPressable
        className="border dark:border-0"
      >
        <CardBody className="overflow-visible p-2 w-64">
          <Image
            shadow="sm"
            radius="lg"
            alt={title}
            className="w-[280px] object-cover h-[230px]"
            src={imageUrl ?? ""}
          />
        </CardBody>
        <CardFooter className="text-small flex flex-col gap-y-1 justify-start items-start">
          <b>{title}</b>
          <p className="text-default-500 italic">{category}</p>
          <div className="flex flex-row my-2 items-center justify-between w-full">
            <div className="flex flex-row items-center space-x-3">
              <BookOpen className="h-7 w-7 bg-green-600/20 text-green-600 p-1.5 rounded-md" />
              <span className="text-default-500">{chapters} chapters</span>
            </div>
            <div>
              {purchased ? (
                <span className="text-gray-500">Paid</span>
              ) : (
                `Price $ ${price}`
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
