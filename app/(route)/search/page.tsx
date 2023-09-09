import UserCard from "@/components/cards/user-card";
import ErrorMessage from "@/components/ui/error";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//TODO: useAuth, useUser?????
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
      <div className="mt-5 grid grid-cols-1 gap-2  min-[690px]:grid-cols-2 min-[765px]:grid-cols-1 min-[810px]:grid-cols-2 min-[1500px]:grid-cols-3">
        {res.users.length === 0 && (
          <p className="text-lg font-semibold">No users were found!</p>
        )}
        {res.users.map((user) => (
          <>
            {/* TODO: remove dups */}
            <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} />
            <UserCard user={user} userType={"User"} key={user.id} />
          </>
        ))}
      </div>
    </>
  );
}

export default Page;
