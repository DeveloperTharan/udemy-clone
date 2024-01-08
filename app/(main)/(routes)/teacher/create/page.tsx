"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/provider/form-provider";
import { Button, Input } from "@nextui-org/react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export default function CreatePage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", data);
      router.push(`/teacher/${response.data.id}`);
      toast.success("Course created");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-screen p-6 md:p-0">
      <div>
        <h1 className="text-2xl font-semibold">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Course title
                  </FormLabel>
                  <FormControl className="my-2">
                    <Input
                      size="sm"
                      radius="md"
                      fullWidth
                      variant="flat"
                      disabled={isSubmitting}
                      placeholder="eg: Introduction to React"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-600">
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage className="text-xs text-slate-800" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher">
                <Button type="button" variant="ghost" className="border-0">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="solid"
                className="bg-black text-white dark:bg-white dark:text-black"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
