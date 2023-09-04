import ThreadCard from "@/components/cards/thread-card";
import ErrorMessage from "@/components/ui/error";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const res = await fetchThreads(1, 30);
  if (!user)
    return (
      <ErrorMessage
        message="It appears you are not logged in. You must sign in before you can use
    Strings"
      />
    );
  return (
    <>
      <h1 className="text-left text-3xl font-bold text-primary">Home</h1>

      <section className="mt-5 flex flex-col gap-5">
        {res.threads.length === 0 ? (
          <p className="text-center text-base text-muted-foreground">
            No strings attached!
          </p>
        ) : (
          res.threads.map((thread) => (
            <ThreadCard thread={thread} user={user} key={thread.id} />
          ))
        )}
      </section>
    </>
  );
}
