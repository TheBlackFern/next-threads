"use client";

import React from "react";
import { IUser } from "@/lib/models/user.model";
import { Card, CardContent, CardFooter } from "../ui/card";
import Avatar from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type UserCardProps = {
  user: IUser;
  userType: string; //TODO: better type!
};

const UserCard = ({ user, userType }: UserCardProps) => {
  const router = useRouter();
  //FIXME: truncate text
  return (
    <Card className="w-auto">
      <CardContent className="flex flex-col items-center pt-6 max-[350px]:gap-3 min-[351px]:flex-row">
        <div className="flex flex-row gap-4">
          <div className="max-[350px]:hidden">
            <Avatar src={user.image} alt="user's profile photo" />
          </div>
          <div className="min-[351px]:hidden">
            <Avatar src={user.image} alt="user's profile photo" size="xl" />
          </div>
          <div className="mr-2 flex flex-col items-start">
            <p className="line-clamp-1 break-all font-semibold">{user.name}</p>
            <p className="line-clamp-1 break-all text-sm font-medium text-muted-foreground">
              {`@${user.username}`}
            </p>
            <Button
              onClick={() => router.push(`/profile/${user.id}`)}
              className="mt-auto h-7 w-full rounded-full min-[351px]:hidden"
            >
              View
            </Button>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/profile/${user.id}`)}
          className="ml-auto rounded-full max-[350px]:hidden"
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
