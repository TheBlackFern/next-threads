"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadSchema } from "@/lib/schemas/thread";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";

type Props = {
  userId: string;
};

const ThreadForm = ({ userId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof threadSchema>) {
    await createThread({
      text: values.thread,
      author: values.accountId,
      community: null,
      path: pathname,
    });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex flex-col justify-start space-y-8"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-base font-semibold text-primary">
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="The whether is great!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-semibold">
          Post String
        </Button>
      </form>
    </Form>
  );
};

export default ThreadForm;
