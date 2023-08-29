"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { getErrorMessage } from "../utils";
import Thread, { IThread } from "../models/thread.model";

type Params = {
  text: string;
  author: string;
  community: string | null;
  path: string;
};

export async function createThread({
  text,
  author,
  community,
  path,
}: Params): Promise<void> {
  connectToDB();
  try {
    const newThread = await Thread.create({
      text,
      author,
      community: null,
    });
    await User.findByIdAndUpdate(author, {
      $push: { threads: newThread.id },
    });
  } catch (error) {
    throw new Error(`Failed to create a thread: ${getErrorMessage(error)}`);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  const skipNumber = (pageNumber - 1) * pageSize;
  const threadsQuery = Thread.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipNumber)
    .limit(pageSize)
    .populate({ path: "author", model: "User" })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const threadsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const threads = await threadsQuery.exec();
  const hasNext = threadsCount > skipNumber + threads.length;

  return { threads, hasNext };
}
