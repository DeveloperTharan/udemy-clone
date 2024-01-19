"use client";

import Link from "next/link";
import React from "react";

export const Attachments = ({
  attachments,
}: {
  attachments: { id: string; title: string; url: string }[];
}) => {
  const titlehandler = (title: string, length: number) => {
    if (title.length > length) {
      return title.slice(0, length) + "...";
    } else {
      return title;
    }
  } 

  return (
    <div className="w-full h-auto">
      {attachments.map((data) => (
        <Link
          href={data.url}
          target="_blank"
          key={data.id}
          className="p-4 text-sm text-blue-500 bg-blue-500/20 dark:bg-gray-900/80
          rounded-md underline"
        >
          {titlehandler(`${data.title}`, 35)}
        </Link>
      ))}
    </div>
  );
};
