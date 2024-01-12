"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { Category, Course } from "@prisma/client";

export default function Courses() {
  const [data, setData] = useState<[Course[], Category[]]>([[], []]);
  const [category, setCategory] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/courses");
      setData(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCourses(data[0].map((course) => ({ ...course })));
    setCategory(data[1].map((category) => ({ ...category })));
  }, [data]);

  return (
    <div className="p-6">
      
    </div>
  );
}
