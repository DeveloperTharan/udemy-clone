"use client";

import React from "react";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

import { User } from "@prisma/client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { AccountDeleteModel } from "@/components/model/AccountDeleteModel";

export const Danger = ({ initialData }: { initialData: User | null }) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await axios.delete(`/api/userdata/${initialData?.id}`);
      router.push("/");
      
      return new NextResponse("success", { status: 200 });
    } catch (error) {
      console.log(["USER_DELETE"], error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full my-3">
      <h2 className="font-semibold">Delete Account</h2>
      <div className="flex flex-row justify-between items-center w-full">
        <h4 className="text-xs md:text-sm text-gray-400">
          Delete your account and all its associated data
        </h4>
        <AccountDeleteModel onConfirm={onClick} />
      </div>
    </div>
  );
};
