import React from 'react'

import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import { Category, Course } from '@prisma/client';

interface CoursesList {
    courses: Course[]
    category: Category[]
}

export const CoursesList = ({ courses, category } : CoursesList) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {courses.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-2">
            <Image
              radius="lg"
              width="100%"
              height={"500px"}
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.imageUrl!}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}