"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Attachment, Course } from "@prisma/client";

import { Button, button } from "@nextui-org/react";
import { FileUpload } from "@/components/FileUploder";

import { PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border dark:border-gray-800 bg-slate-100 dark:bg-gray-950/80 rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button
          onClick={toggleEdit}
          variant="ghost"
          size="sm"
          className="border-0"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p className="text-sm text-slate-500 italic">No Attahements yet!</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 dark:bg-transparent border border-sky-200 
                  dark:border-gray-700 text-sky-700 dark:text-gray-400 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId == attachment.id && (
                    <Loader2 className="animate-spin h-4 w-4 ml-auto" />
                  )}
                  {deletingId !== attachment.id && (
                    <button 
                      className="ml-auto p-1 bg-gray-900/80 rounded-full hover:bg-red-600 hover:text-white"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything to your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};
