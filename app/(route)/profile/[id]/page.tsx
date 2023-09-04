import { ProfileHeader } from "@/components/shared";
import ErrorMessage from "@/components/ui/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import ThreadsTab from "@/components/shared/threads-tab";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
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

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader userInfo={userInfo} userId={user.id} />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          {/* TODO: fix colours! */}
          <TabsList className="flex h-auto flex-1">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="group flex flex-1 items-center gap-2 py-2"
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain group-hover:grayscale group-hover:invert"
                  />
                  <p className="text-xs sm:hidden">{tab.label}</p>
                </div>
                <p className="text-lg group-hover:text-foreground max-sm:hidden">
                  {tab.label}
                </p>
                {tab.label === "Threads" && (
                  <p className="ml-1 grid h-6 w-6 content-center rounded-full border bg-muted-foreground text-sm font-medium text-secondary">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent className="w-full" value={tab.value} key={tab.label}>
              <ThreadsTab
                accoundId={userInfo.id}
                currentUserId={user.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
