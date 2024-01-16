"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { Loader2 } from "lucide-react";

import { ConfirmModel } from "@/components/model/ConfirmModel";

import { Button } from "@nextui-org/react";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        router.push('/teacher');
        toast.success("Course published");
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="solid"
        size="sm"
        className="bg-black text-white dark:bg-white dark:text-black"
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <>{isPublished ? "Unpublish" : "Publish"}</>
        )}
      </Button>
      <ConfirmModel onConfirm={onDelete} isLoading={isLoading} />
    </div>
  );
};
