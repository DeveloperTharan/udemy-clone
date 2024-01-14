"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/provider/form-provider";
import { Button, Textarea } from "@nextui-org/react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    desription: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({ initialData } : { initialData: User | null }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desription: initialData?.desription ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/userdata/${initialData?.id}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {!isEditing && (
        <div
          className={cn(
            "w-full border-[2px] border-gray-200 dark:border-gray-600 h-auto min-h-24 rounded-xl text-start px-4 group flex justify-between",
            !initialData?.desription && "text-gray-600 italic"
          )}
        >
          <h4 className="my-2">{initialData?.desription || "No description"}</h4>
          <Button
            variant="solid"
            className="bg-black text-white dark:bg-white dark:text-black opacity-0 
            group-hover:opacity-100 mt-auto mb-2"
            onClick={toggleEdit}
          >
            Edit
          </Button>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="desription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      variant="bordered"
                      disabled={isSubmitting}
                      placeholder="e.g. 'Joes, softwear developer from US'"
                      endContent={
                        <div className="flex flex-row gap-x-2 mt-auto mb-2">
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            variant="solid"
                            className="bg-black text-white dark:bg-white dark:text-black"
                          >
                            Save
                          </Button>
                          <Button
                            variant="solid"
                            className="bg-black text-white dark:bg-white dark:text-black"
                            onClick={toggleEdit}
                          >
                            cancel
                          </Button>
                        </div>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};
