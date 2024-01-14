"use client";

import React from "react";

import { useUser } from "@/context/userContext";
import { Avatar } from "@nextui-org/react";
import { cn } from "@/lib/utils";

export const TeacherInfo = () => {
  const { user } = useUser();
  return (
    <div className="w-full h-auto max-h-fit flex flex-col lg:flex-row">
      <div className="px-10">
        <Avatar
          src={user?.imageUrl}
          className="w-52 h-52"
          title={user?.firstName}
        />
      </div>
      <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start space-y-4 lg:mt-10">
        <h1 className="text-2xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p
          className={cn(
            "text-sm text-gray-400 font-normal italic",
            !user?.desription && "text-gray-600"
          )}
        >
          {user?.desription || "No description"}
        </p>
      </div>
    </div>
  );
};
