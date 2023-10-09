import UserCard from "@/components/cards/user-card";
import WIP from "@/components/shared/wip";
import ErrorMessage from "@/components/ui/error";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//TODO: useAuth, useUser?????
async function Page() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
  });

  //TODO: decide whether to keep the Search and Activity headings
  return (
    <>
      <h1 className="text-2xl font-semibold">Search</h1>
      <WIP what="Search filter" />
      <div className="mt-5 grid w-full grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] gap-2">
        {res.users.length === 0 && (
          <p className="text-lg font-semibold">No users were found!</p>
        )}
        {res.users.map((user) => (
          <>
            {/* TODO: remove dups */}
            <UserCard user={user} userType={"User"} key={user.id} />
            {/* <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} /> */}
          </>
        ))}
      </div>
    </>
  );
}

export default Page;
