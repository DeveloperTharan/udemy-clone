import React from "react";

import Category from "@/components/Category";
import { db } from "@/lib/db";

export default async function Main() {
  const category = await db.category.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div className="flex flex-col w-full h-auto min-h-screen px-5">
      <Category category={category} />
    </div>
  );
}

