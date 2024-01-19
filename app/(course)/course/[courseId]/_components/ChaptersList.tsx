"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Accordion, AccordionItem } from "@nextui-org/react";

import { Lock, PlayCircle } from "lucide-react";

interface ChaptersListProps {
  chapter: { id: string; title: string; isLocked: boolean }[];
}

export const ChaptersList = ({ chapter }: ChaptersListProps) => {
  const router = useRouter();

  return (
    <Accordion selectionMode="single" variant="splitted">
      {chapter.map((data) => (
        <AccordionItem key={data.id} aria-label={data.title} title={data.title}>
          <button
            className="flex flex-row items-center justify-start gap-x-2 text-sm 
            bg-gray-100/80 dark:bg-gray-800/80 p-2 rounded-md mb-5 w-full"
            disabled={data.isLocked}
            onClick={() => router.push(`/course/chapter/${data.id}`)}
          >
            {data.isLocked ? (
              <Lock className="h-4 w-4" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )}
            {data.title}
          </button>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
