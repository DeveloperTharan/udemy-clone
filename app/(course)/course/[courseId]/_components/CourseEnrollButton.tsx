"use client";

import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@nextui-org/react";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
 /*  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }; */

  return (
    <Button
      /* onClick={onClick}
      disabled={isLoading} */
      size="md"
      variant="solid"
      className="w-full text-white bg-purple-600"
    >
      Enroll for $ {price}
    </Button>
  );
};
