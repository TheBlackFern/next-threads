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
      <CardContent className="flex flex-row items-center pt-6">
        <div className="flex flex-row gap-4">
          <Avatar src={user.image} alt="user's profile photo" />

          <div className="mr-2 flex flex-col items-start">
            <p className="line-clamp-1 break-all font-semibold">{user.name}</p>
            <p className="line-clamp-1 break-all text-sm font-medium text-muted-foreground">
              {`@${user.username}`}
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push(`/profile/${user.id}`)}
          className="ml-auto rounded-full"
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
