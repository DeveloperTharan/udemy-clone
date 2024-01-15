'use client'

import { useRouter } from "next/navigation";
import React from "react";

export const Category = ({
  category,
}: {
  category: { id: string; name: string }[];
}) => {
  const router = useRouter();

  return (
    <div className="w-full h-fit px-5 lg:px-24 xl:px-32 py-3 shadow overflow-x-auto dark:shadow-slate-800 scrollbar-hide">
      <div className="flex flex-row-reverse items-center justify-between gap-x-5">
        {category.map((category) => (
          <div key={category.id}>
            <div
              className="text-xs lg:text-sm text-nowrap hover:text-purple-600 transition duration-300 ease-linear"
              role="button"
              onClick={() => router.push(`/main/${category.id}`)}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
