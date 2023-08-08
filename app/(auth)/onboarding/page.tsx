import AccountForm from "@/components/forms/AccountForm";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();
  if (!user)
    return (
      <main className="mx-auto flex max-w-3xl flex-col justify-start p-10">
        <h1 className="text-3xl font-bold text-primary">Oops...</h1>
        <p className="mt-3 text-base text-primary">
          Something went wrong. Please, reload and try again.
        </p>
      </main>
    );
  const userInfo = await fetchUser(user?.id);

  const userData = {
    id: user?.id!,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start p-10">
      <h1 className="text-3xl font-bold text-primary">Onboarding</h1>
      <p className="mt-3 text-base text-primary">
        Complete your profile now to use Strings
      </p>
      <section className="mt-9 bg-background">
        <AccountForm userData={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;