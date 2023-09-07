import { IThread } from "@/lib/models/thread.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Avatar from "../ui/avatar";

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
        <Link className="" href={`/profile/${thread.author.id}`}>
          <div className="relative h-12 w-12">
            <Avatar src={thread.author.image} alt="author's profile photo" />
            <div className="absolute left-1/2 top-full mt-3 h-12 w-0.5 rounded-full bg-muted-foreground" />
          </div>
        </Link>
        <div className="flex flex-col">
          <div className="flex">
            <Link className="flex gap-3" href={`/profile/${thread.author.id}`}>
              <span className="line-clamp-1 hidden w-fit cursor-pointer break-all font-semibold sm:inline">
                {`${thread.author.name}`}
              </span>
              <span className="line-clamp-1 w-fit cursor-pointer break-all text-muted-foreground">
                {`\@${thread.author.username}`}
              </span>
            </Link>
            <span className="ml-2 hidden w-fit gap-2 text-muted-foreground sm:flex">
              <span className="text-[26px] font-bold leading-none">·</span>
              {`${thread.created.toLocaleDateString()}`}
            </span>
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
            <Link href={`/string/${thread.id}`}>
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
            <Link href={`/string/${thread.id}`}>
              <p className="ml-1 text-xs font-medium ">
                {thread.children.length} replies
              </p>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
