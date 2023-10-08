import { IThread } from "@/lib/models/thread.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Avatar, { avatarVariants } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface ThreadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thread: IThread;
  currentUserId: string;
  isComment?: boolean;
}

const ThreadCard = ({ thread, currentUserId, isComment }: ThreadCardProps) => {
  return (
    <Card
      className={`relative w-full bg-secondary ${
        isComment ? "border-0 bg-background" : ""
      }`}
    >
      <CardContent className="mt-8 flex gap-3 pb-3">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            avatarVariants({ size: "default" }),
            "rounded-full p-0",
          )}
          href={`/profile/${thread.author.id}`}
        >
          <div className="relative h-12 w-12">
            <Avatar src={thread.author.image} alt="author's profile photo" />
            <div className="absolute left-1/2 top-full mt-3 h-12 w-0.5 rounded-full bg-muted-foreground" />
          </div>
        </Link>
        <div className="flex flex-col">
          <div className="flex">
            <Link
              className={cn(buttonVariants({ variant: "ghost" }), "h-fit p-0")}
              href={`/profile/${thread.author.id}`}
            >
              <p className="line-clamp-1 w-fit cursor-pointer space-x-2 break-all">
                <span className="hidden font-semibold sm:inline">
                  {`${thread.author.name}`}
                </span>
                <span className="text-muted-foreground">
                  {`\@${thread.author.username}`}
                </span>
              </p>
            </Link>
            <p className="ml-2 hidden h-fit w-fit space-x-2 text-sm text-muted-foreground sm:inline ">
              {`• ${thread.created.toLocaleDateString()}`}
            </p>
          </div>
          <p className="w-auto whitespace-pre-wrap break-all ">{thread.text}</p>
        </div>
      </CardContent>
      <CardFooter className="">
        <div className="ml-14 flex flex-col gap-1">
          <div className="flex gap-3">
            <Image
              src="/assets/heart-gray.svg"
              alt="heart icon"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
            <Link
              className={cn(buttonVariants({ variant: "ghost" }), "h-fit p-0")}
              href={`/string/${thread.id}`}
            >
              <Image
                src="/assets/reply.svg"
                alt="reply icon"
                width={24}
                height={24}
                className="cursor-pointer object-contain"
              />
            </Link>
            <Image
              src="/assets/repost.svg"
              alt="repost icon"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
            <Image
              src="/assets/share.svg"
              alt="share icon"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
          </div>
          {/* isComment && thread.children.length > 0 */}
          {true && (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "ml-1 h-fit w-fit justify-start p-0 text-sm font-medium",
              )}
              href={`/string/${thread.id}`}
            >
              {thread.children.length} replies
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
