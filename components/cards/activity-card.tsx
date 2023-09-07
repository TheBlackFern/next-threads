import React from "react";
import { IThread } from "@/lib/models/thread.model";
import { Card } from "../ui/card";
import Avatar from "../ui/avatar";
import Link from "next/link";
import { Reply } from "lucide-react";
import { Button } from "../ui/button";

type ActivityCardProps = {
  parentThread: IThread;
  replyThread: IThread;
};

const ActivityCard = ({ parentThread, replyThread }: ActivityCardProps) => {
  return (
    <Card className="flex flex-col gap-1 p-4 sm:p-6">
      <Link
        href={`/string/${parentThread.id}`}
        className="flex items-center gap-3"
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
                className="flex gap-3"
                href={`/profile/${replyThread.author.id}`}
              >
                <span className="line-clamp-1 hidden w-fit cursor-pointer break-all font-semibold xs:inline">
                  {`${replyThread.author.name}`}
                </span>
                <span className="line-clamp-1 w-fit cursor-pointer break-all text-muted-foreground">
                  {`\@${replyThread.author.username}`}
                </span>
              </Link>
              <span className="ml-2 flex w-fit gap-2 text-muted-foreground max-sm:hidden">
                <span className="text-[26px] font-bold leading-none">·</span>
                {`${replyThread.created.toLocaleDateString()}`}
              </span>
            </div>
            <p className="line-clamp-1 break-all">{replyThread.text}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;
