import { fetchThreadsByUser } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/thread-card";
import { IUser } from "@/lib/models/user.model";
import { IThread } from "@/lib/models/thread.model";
import Link from "next/link";
import { Button } from "../ui/button";

type ThreadsTabProps = {
  currentUserId: string;
  accoundId: string;
  accountType: string;
};

const ThreadsTab = async ({
  currentUserId,
  accoundId,
  accountType,
}: ThreadsTabProps) => {
  const res = await fetchThreadsByUser(accoundId);

  if (!res) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.threads.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-lg">Your strings will appear here!</p>
          <Link href={"/create-string"}>
            <Button className="rounded-full text-lg font-medium">
              Create a string
            </Button>
          </Link>
        </div>
      )}
      {res.threads.map((thread) => {
        //TODO: community
        // because we have a massive object with random types, we cannot just change
        // it or make a deep/structured clone
        const resThread = {
          _id: thread._id,
          id: thread.id,
          text: thread.text,
          author:
            accountType === "User"
              ? ({
                  name: res.name,
                  username: res.username,
                  image: res.image,
                  id: res.id,
                } as IUser)
              : ({
                  name: thread.author.name,
                  username: thread.author.username,
                  image: thread.author.image,
                  id: thread.author.id,
                } as IUser),
          community: null,
          created: thread.created,
          parentId: thread.parentId,
          children: thread.children,
        } as unknown as IThread;
        // TS just doesn't believe me even though this was literally a copied definition of IThread

        return (
          <div>
            <ThreadCard
              thread={resThread}
              currentUserId={currentUserId}
              key={thread._id}
            />
          </div>
        );
      })}
    </section>
  );
};

export default ThreadsTab;
