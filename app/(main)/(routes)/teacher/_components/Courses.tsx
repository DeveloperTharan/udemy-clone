"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@nextui-org/react";

export default function Courses() {
  return (
    <div className="p-6">
      <Button size="md" variant="solid">
        <Link href={"/teacher/create"}>Create Course</Link>
      </Button>
    </div>
  );
}
