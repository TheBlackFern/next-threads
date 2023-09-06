import React from "react";
import Avatar from "../ui/avatar";
import { IUser } from "@/lib/models/user.model";

type Props = {
  userInfo: IUser;
  userId: string;
};

// TODO: community
const ProfileHeader = ({ userInfo, userId }: Props) => {
  return (
    <div className="flex w-full flex-col justify-start ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Avatar
              height={96}
              width={96}
              src={userInfo.image}
              alt="profile picture"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-xl font-bold">{userInfo.name}</h2>
            <p className="font-medium text-muted-foreground">
              @{userInfo.username}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg">{userInfo.bio}</p>
      <div className="mt-4 h-0.5 w-full bg-border" />
    </div>
  );
};

export default ProfileHeader;
