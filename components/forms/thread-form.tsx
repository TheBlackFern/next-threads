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

type ThreadFormProps = {
  userId: string;
};

const ThreadForm = ({ userId }: ThreadFormProps) => {
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
              <FormControl ref={inputText}>
                <Textarea rows={4} placeholder="Your string..." {...field} />
              </FormControl>
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
