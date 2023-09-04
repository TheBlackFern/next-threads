"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/lib/schemas/thread";
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
import { Input } from "../ui/input";
import { createComment } from "@/lib/actions/thread.actions";

type CommentFormProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  threadId: string;
  currentUserAvatar: string;
  currentUserId: string;
};

const CommentForm = ({
  threadId,
  currentUserAvatar,
  currentUserId,
  className,
}: CommentFormProps) => {
  const inputText = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    // TODO: community
    await createComment({
      text: values.thread,
      author: JSON.parse(currentUserId),
      community: null,
      path: pathname,
      parent: threadId,
    });

    router.push("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex flex-row items-center justify-center gap-3"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-row items-center gap-3 space-y-0">
              <FormLabel className="space-y-0 text-base font-semibold text-primary">
                <Image
                  src={currentUserAvatar}
                  alt="current user avatar"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <span className="sr-only">Comment</span>
              </FormLabel>
              <div className="flex w-full flex-col gap-1">
                <FormControl ref={inputText}>
                  <Input type="text" placeholder="Comment..." {...field} />
                </FormControl>
                <div className="absolute top-[calc(100%+0.5rem)] flex flex-row gap-2">
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
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-3xl px-8 py-2 text-sm max-xs:w-full"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
