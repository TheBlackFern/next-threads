import { ProfileHeader } from "@/components/shared";
import ErrorMessage from "@/components/ui/error";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ThreadsTab from "@/components/shared/threads-tab";
import TabsProfile from "@/components/shared/profile-tabs";

type PageProps = {
  params: {
    id: string;
  };
};

async function Page({ params }: PageProps) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader userInfo={userInfo} userId={user.id} />
      <div className="mt-9">
        <Tabs defaultValue="strings" className="w-full">
          {/* TODO: fix colours! */}
          <TabsProfile threadsCount={userInfo.threads.length} />
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
