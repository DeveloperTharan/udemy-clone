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
import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  role: z.string().min(1, {
    message: "Description is required",
  }),
});

export const RoleForm = ({ initialData }: { initialData: User | null }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: initialData?.role ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: { role: string }) => {
    try {
      await axios.patch(`/api/userdata/${initialData?.id}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
      //@ts-ignore
      window.location.reload();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {!isEditing && (
        <div className="w-full text-start flex items-center justify-between group">
          <h4 className="">{initialData?.role}</h4>
          <Button
            variant="solid"
            className="bg-black text-white dark:bg-white dark:text-black opacity-0 group-hover:opacity-100"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        onSubmit({
                          role: e.target.value,
                        });
                      }}
                    >
                      <Radio value="STUDENT">STUDENT</Radio>
                      <Radio value="TEACHER">TEACHER</Radio>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="solid"
              className="bg-black text-white dark:bg-white dark:text-black"
              onClick={toggleEdit}
            >
              cancel
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
