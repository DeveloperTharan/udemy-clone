import React from "react";
import Link from "next/link";

export const Category2 = ({
  category,
}: {
  category: { id: string; name: string }[];
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-5 justify-center items-center my-4">
      {category.map((item) => (
        <Link href={`/main/${item.id}`}>
          <div
            className="px-10 py-5 text-lg font-medium border dark:border-gray-500 w-72 text-center
          hover:bg-purple-700/10 hover:text-purple-700 hover:border-0"
            role="button"
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
