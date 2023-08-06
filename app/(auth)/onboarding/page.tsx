import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();
  const userInfo = {};

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
        <AccountProfile userData={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
