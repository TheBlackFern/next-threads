"use server";

import { GeneralUserInfo } from "@/components/forms/account-form";
import User, { IUser } from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "../utils";
import { FilterQuery, Query, SortOrder } from "mongoose";

type UpdateUserParams = {
  userId: string;
  userData: GeneralUserInfo;
  path: string;
};

export async function updateUser({
  userId,
  userData,
  path,
}: UpdateUserParams): Promise<void> {
  try {
    connectToDB();
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

type FetchUsersParams = {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc" as SortOrder,
}: FetchUsersParams) {
  try {
    connectToDB();

    const skipNumber = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipNumber)
      .limit(pageSize);

    const usersCount = await User.countDocuments(query);
    const users = await usersQuery.exec();
    const hasNext = usersCount > skipNumber + users.length;

    return { users, hasNext };
  } catch (error) {
    throw new Error(`Failed to fetch users: ${getErrorMessage(error)}`);
  }
}
