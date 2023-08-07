import { IThread } from "@/lib/models/thread.model";
import { User } from "@clerk/nextjs/server";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  thread: IThread;
  user: User;
}

const ThreadCard = ({ thread, user }: Props) => {
  return <div>{thread.text}</div>;
};

export default ThreadCard;
