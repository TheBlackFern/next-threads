import React from "react";
import { IThread } from "@/lib/models/thread.model";
import { Card } from "../ui/card";
import Avatar from "../ui/avatar";
import Link from "next/link";
import { Reply } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type ActivityCardProps = {
  parentThread: IThread;
  replyThread: IThread;
};

const ActivityCard = ({ parentThread, replyThread }: ActivityCardProps) => {
  return (
    <Card className="flex flex-col gap-1 p-4 sm:p-6">
      <Link
        href={`/string/${parentThread.id}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex h-fit w-fit items-center gap-3 p-0",
        )}
      >
        <div className="max-sm:hidden">
          <Avatar
            src={parentThread.author.image}
            alt="repliers's profile picture"
            size="sm"
          />
        </div>
        <div className="sm:hidden">
          <Avatar
            src={parentThread.author.image}
            alt="repliers's profile picture"
            size="xs"
          />
        </div>
        <p className="line-clamp-1 break-all text-xs text-muted-foreground sm:text-sm">
          {parentThread.text}
        </p>
      </Link>
      <div className="flex gap-1 max-sm:ml-2 sm:gap-3">
        <Reply className="mt-1.5 h-4 w-4 rotate-180 sm:ml-3 sm:h-6 sm:w-6" />
        <div className="flex items-center gap-1">
          <div className="max-sm:hidden">
            <Avatar
              src={replyThread.author.image}
              alt="repliers's profile picture"
            />
          </div>
          <div className="sm:hidden">
            <Avatar
              src={replyThread.author.image}
              alt="repliers's profile picture"
              size="sm"
            />
          </div>
          <div className="flex flex-col max-sm:text-sm">
            <div className="flex ">
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex h-fit gap-3 p-0",
                )}
                href={`/profile/${replyThread.author.id}`}
              >
                <p className="line-clamp-1 w-fit cursor-pointer space-x-2 break-all">
                  <span className="hidden font-semibold sm:inline">
                    {`${replyThread.author.name}`}
                  </span>
                  <span className="text-muted-foreground">
                    {`\@${replyThread.author.username}`}
                  </span>
                </p>
              </Link>
              <p className="ml-2 hidden h-fit w-fit space-x-2 text-sm text-muted-foreground sm:inline ">
                {`• ${replyThread.created.toLocaleDateString()}`}
              </p>
            </div>
            <p className="line-clamp-1 break-all">{replyThread.text}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;
