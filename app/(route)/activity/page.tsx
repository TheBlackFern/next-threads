import ActivityCard from "@/components/cards/activity-card";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error";
import { fetchThreadsByUser } from "@/lib/actions/thread.actions";
import { fetchActivity, fetchUser } from "@/lib/actions/user.actions";
import { IThread } from "@/lib/models/thread.model";
import { getRepliesFromThreads } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user)
    return (
      <ErrorMessage
        message="It appears you are not logged in. You must sign in before you can
          create Strings."
      />
    );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const threads = await fetchActivity(userInfo._id);
  if (!threads)
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-balance texet-center text-lg">
          No activity yet! Create a string to start engaging with the others!
        </p>
        <Link href={"/create-string"}>
          <Button className="rounded-full px-5 py-6 text-lg font-medium">
            Create a string
          </Button>
        </Link>
      </div>
    );
  const replies = getRepliesFromThreads(threads);

  //TODO: decide whether to keep the Search and Activity headings
  return (
    <>
      <h1 className="text-2xl font-semibold">Activity</h1>
      <section className="mt-5">
        {!replies && (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-balance text-center text-lg">
              No activity yet! Create a string to start engaging with the
              others!
            </p>
            <Link href={"/create-string"}>
              <Button className="mt-3 rounded-full px-5 py-6 text-lg font-medium">
                Create a string
              </Button>
            </Link>
          </div>
        )}
        {replies &&
          replies.map(([reply, parent]) => (
            <ActivityCard replyThread={reply} parentThread={parent} />
          ))}
      </section>
    </>
  );
}

export default Page;
