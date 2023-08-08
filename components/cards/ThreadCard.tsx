import { IThread } from "@/lib/models/thread.model";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  thread: IThread;
  user: User;
}

const ThreadCard = ({ thread, user }: Props) => {
  return (
    <Card className="w-full bg-secondary">
      <CardContent className="mt-8 flex gap-3">
        <Link className="" href={`/profile/${thread.author.id}`}>
          <Image
            width={48}
            height={48}
            src={thread.author.image}
            alt="profile photo"
            className="h-12 w-12 cursor-pointer rounded-full object-cover"
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex">
            <Link className="flex gap-3" href={`/profile/${thread.author.id}`}>
              <span className="w-fit cursor-pointer font-semibold">
                {`${thread.author.name}`}
              </span>
              <span className="w-fit cursor-pointer text-ellipsis text-muted-foreground">
                {`\@${thread.author.username}`}
              </span>
            </Link>
            <span className="ml-2 flex w-fit gap-2 text-ellipsis text-muted-foreground">
              <span className="text-[26px] font-bold leading-none">·</span>
              {`${thread.created.toLocaleDateString()}`}
            </span>
          </div>
          <p>{thread.text}</p>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <div className="flex gap-3">
          <Image
            src="/assets/heart-gray.svg"
            alt="heart icon"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
          <Link href="/thread/${thread.id}">
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
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
