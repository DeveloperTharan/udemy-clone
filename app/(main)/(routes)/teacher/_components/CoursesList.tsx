import React, { useEffect, useState } from "react";

import { Category, Course } from "@prisma/client";
import { DataTable } from "@/components/Table/DataTable";

interface CoursesList {
  courses: Course[];
  category: Category[];
}

export const CoursesList = ({ courses, category }: CoursesList) => {
  const [categoryData, setCategoryData] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    const res = category.map((category) => ({
      key: category.id,
      value: category.name,
    }));

    setCategoryData(res);
  }, [category]);

  return (
    <DataTable courseData={courses} categoryData={categoryData} />
  );
};