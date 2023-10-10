import React from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar, { avatarVariants } from "../ui/avatar";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { IThread } from "@/lib/models/thread.model";

interface ThreadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thread: IThread;
  currentUserId: string;
  isComment?: boolean;
}

const ThreadCard = ({ thread, currentUserId, isComment }: ThreadCardProps) => {
  return (
    <div
      className={cn(
        "relative grid w-full auto-cols-auto grid-flow-col place-content-start gap-1.5 rounded-lg border bg-secondary p-3 text-card-foreground shadow-sm",
        isComment && "border-0 bg-background",
      )}
    >
      <div className="flex flex-col items-center">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            avatarVariants({ size: "default" }),
            "rounded-full p-0",
          )}
          href={`/profile/${thread.author.id}`}
        >
          <Avatar src={thread.author.image} alt="author's profile photo" />
        </Link>
        <div className="mt-0.5 h-full w-0.5 rounded-full bg-primary" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }), "h-fit p-0")}
            href={`/profile/${thread.author.id}`}
          >
            <p className="line-clamp-1 w-fit cursor-pointer break-all">
              <span className="hidden font-semibold sm:inline">
                {`${thread.author.name}`}
              </span>
              <span className="font-semibold text-foreground sm:ml-2 sm:font-normal sm:text-muted-foreground">
                {`\@${thread.author.username}`}
              </span>
            </p>
          </Link>
          <p className="ml-1.5 hidden h-fit w-fit text-sm text-muted-foreground sm:inline ">
            {`• ${thread.created.toLocaleDateString()}`}
          </p>
        </div>
        <p className="w-auto whitespace-pre-wrap break-words text-sm">
          {thread.text}
        </p>

        <div className="mt-1.5 flex flex-col items-start gap-1 pt-0">
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
              {thread.children.length}{" "}
              {thread.children.length !== 1 ? "replies" : "reply"}
            </Link>
          )}

          {/* !isComment && thread.community */}
          {!isComment && thread.community && (
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "ml-1 h-fit w-fit justify-start p-0 text-sm font-medium",
              )}
              href={`/communities/${thread.community.id}`}
            >
              <Avatar
                src={thread.community.image}
                alt={"community avatar"}
                size={"xs"}
              />
              <p>from {thread.community.name}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
