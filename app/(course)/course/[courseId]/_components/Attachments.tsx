"use client";

import Link from "next/link";
import React from "react";

export const Attachments = ({
  attachments,
}: {
  attachments: { id: string; title: string; url: string }[];
}) => {
  return (
    <div className="w-full h-auto">
      {attachments.map((data) => (
        <Link
          href={data.url}
          target="_blank"
          key={data.id}
          className="p-4 text-sm text-blue-500 bg-blue-500/20 dark:bg-gray-900/80
          rounded-md w-full truncate underline"
        >
          {data.title}
        </Link>
      ))}
    </div>
  );
};
