"use server";

import { GeneralUserInfo } from "@/components/forms/AccountProfile";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

type Params = {
  userId: string;
  userData: GeneralUserInfo;
  path: string;
};

export async function updateUser({
  userId,
  userData,
  path,
}: Params): Promise<void> {
  console.log(userId, userData, path);
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      { ...userData, onboarded: true },
      { upsert: true },
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create or update the user: ${error.message}`);
  }
}
