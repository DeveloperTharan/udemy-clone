"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";

import { User } from "@prisma/client";
import { RoleForm } from "./RoleForm";
import { LastNameForm } from "./LastNameForm";
import { FirstNameForm } from "./FirstNameForm";
import { DescriptionForm } from "./DescriptionForm";
import { FileUpload } from "@/components/FileUploder";

import { Avatar, Chip } from "@nextui-org/react";

import { Pencil, X } from "lucide-react";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const Settings = ({ initialData }: { initialData: User | null }) => {
  const [edit, setEdit] = useState<boolean>(false);

  const router = useRouter();

  const toggleEdit = () => setEdit((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/userdata/${initialData?.id}`, values);
      toast.success("Image updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-row space-x-10 w-full">
      <div className="flex flex-col space-y-4 justify-center items-center p-8 mb-auto">
        <div className="relative">
          {!edit && (
            <>
              <Avatar
                src={initialData?.imageUrl}
                className="w-36 h-36 text-large"
              />
              <div
                className="p-2 bg-gray-900 hover:bg-gray-800/80 absolute bottom-0 right-3 rounded-full text-gray-200"
                role="button"
                onClick={toggleEdit}
              >
                <Pencil size={20} />
              </div>
            </>
          )}
          {edit && (
            <>
              <div className="w-36 h-36 rounded-full">
                <FileUpload
                  endpoint="profileImage"
                  onChange={(url) => {
                    if (url) {
                      onSubmit({ imageUrl: url });
                    }
                  }}
                />
              </div>
              <div
                className="p-2 bg-gray-900 hover:bg-gray-800/80 absolute top-0 right-0 rounded-full text-gray-200"
                role="button"
                onClick={toggleEdit}
              >
                <X size={20} />
              </div>
            </>
          )}
        </div>
        <h2 className="font-semibold text-sm text-center">
          {initialData?.firstName} {initialData?.lastName}
        </h2>
        <div className="relative flex flex-col space-y-2 items-start justify-start">
          <h4 className="text-gray-500 text-sm">
            Role :{" "}
            <Chip>
              {initialData?.role}
            </Chip>
          </h4>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center border-b p-4 w-full dark:border-gray-700 gap-y-3">
          <h1 className="font-extrabold text-3xl">Public profile</h1>
          <p className="font-normal text-gray-400 dark:text-gray-600">
            Add information about yourself
          </p>
        </div>
        <div className="flex flex-col space-y-7 justify-center items-center p-8">
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <h2 className="text-sm text-gray-500">FirstName</h2>
            <FirstNameForm initialData={initialData} />
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <h2 className="text-sm text-gray-500">LastName</h2>
            <LastNameForm initialData={initialData} />
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <h2 className="text-sm text-gray-500">Description</h2>
            <DescriptionForm initialData={initialData} />
          </div>
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <h2 className="text-sm text-gray-500">Your Role</h2>
            <RoleForm initialData={initialData} />
          </div>
        </div>
      </div>
    </div>
  );
};
