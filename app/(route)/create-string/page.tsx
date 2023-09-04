import ThreadForm from "@/components/forms/ThreadForm";
import ErrorMessage from "@/components/ui/error";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user)
    return (
      <>
        <ErrorMessage
          message="It appears you are not logged in. You must sign in before you can
          create Strings."
        />
      </>
    );

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="text-left text-3xl font-bold text-primary">
        Create String
      </h1>
      <ThreadForm userId={userInfo._id} />
    </>
  );
}

export default Page;
