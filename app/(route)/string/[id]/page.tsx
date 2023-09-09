import ThreadCard from "@/components/cards/thread-card";
import CommentForm from "@/components/forms/comment-form";
import ErrorMessage from "@/components/ui/error";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: PageProps) => {
  if (!params.id) return <ErrorMessage />;
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  if (!thread) return <ErrorMessage />;

  // TODO: sorting
  return (
    <section className="relative">
      <ThreadCard thread={thread} currentUserId={user.id} />
      <CommentForm
        className="mt-7"
        threadId={params.id}
        currentUserAvatar={userInfo.image}
        currentUserId={JSON.stringify(userInfo._id)}
      />
      <div className="mt-10">
        {thread.children.reverse().map((child) => (
          <ThreadCard
            isComment={true}
            thread={child}
            currentUserId={user.id}
            key={child.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
