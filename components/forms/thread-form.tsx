"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
import Avatar from "../ui/avatar";

type ThreadFormProps = {
  userId: string;
  userImage: string;
};

const ThreadForm = ({ userId, userImage }: ThreadFormProps) => {
  const inputText = React.useRef<HTMLTextAreaElement | null>(null);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof threadSchema>>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof threadSchema>) {
    // TODO: community
    await createThread({
      text: values.thread,
      author: userId,
      community: null,
      path: pathname,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex flex-col justify-start gap-1"
      >
        <div className="flex flex-row items-center justify-between">
          <Avatar src={userImage} alt="user's profile photo" />
          <Button type="submit" className="rounded-full font-semibold">
            Post String
          </Button>
        </div>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="sr-only text-base font-semibold">
                String content
              </FormLabel>
              <FormControl ref={inputText}>
                <Textarea rows={4} placeholder="Your string..." {...field} />
              </FormControl>
              <div className="flex flex-row gap-3">
                <p
                  className={`text-sm ${
                    inputText.current
                      ? inputText.current.value.length > 250
                        ? "text-destructive"
                        : "text-muted-foreground"
                      : ""
                  }`}
                >
                  {inputText.current
                    ? inputText?.current.value.length > 200
                      ? `${inputText?.current?.value.length} / 250`
                      : ""
                    : ""}
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ThreadForm;
