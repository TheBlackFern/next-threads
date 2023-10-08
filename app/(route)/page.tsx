import ThreadCard from "@/components/cards/thread-card";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const res = await fetchThreads(1, 30);
  if (!user) redirect("/sign-in");
  return (
    <>
      <h1 className="sr-only text-left text-3xl font-bold">Feed</h1>

      <section className="flex flex-col gap-5">
        {res.threads.length === 0 ? (
          <p className="text-center text-base text-muted-foreground">
            No strings attached!
          </p>
        ) : (
          res.threads
            .reverse()
            .map((thread) => (
              <ThreadCard
                thread={thread}
                currentUserId={user.id}
                key={thread.id}
              />
            ))
        )}
      </section>
    </>
  );
}
