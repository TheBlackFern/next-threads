"use server";

import { GeneralUserInfo } from "@/components/forms/AccountForm";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "../utils";

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
  } catch (error) {
    throw new Error(
      `Failed to create or update the user: ${getErrorMessage(error)}`,
    );
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return User.findOne({ id: userId });
    // .populate({
    //   path: "Communities",
    //   model: Community,
    // })
  } catch (error) {
    throw new Error(`Failed to fetch user: ${getErrorMessage(error)}`);
  }
}
