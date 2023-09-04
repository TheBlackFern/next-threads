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

  if (!user)
    return (
      <ErrorMessage message="It appears you are not logged in. You must sign in before you can use Strings" />
    );

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  if (!thread) return <ErrorMessage />;

  return (
    <section className="relative">
      <ThreadCard thread={thread} user={user} />
      <CommentForm
        className="mt-7"
        threadId={params.id}
        currentUserAvatar={userInfo.image}
        currentUserId={JSON.stringify(userInfo._id)}
      />
      <div className="mt-10">
        {thread.children.map((child) => (
          <ThreadCard
            isComment={true}
            thread={child}
            user={user}
            key={child.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
