"use server";

import { connectToDB } from "../mongoose";
import { getErrorMessage } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Thread from "../models/thread.model";

type createThreadParams = {
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
}: createThreadParams): Promise<void> {
  try {
    connectToDB();
    const newThread = await Thread.create({
      text,
      author,
      community: community,
    });
    await User.findByIdAndUpdate(author, {
      $push: { threads: newThread.id },
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create a thread: ${getErrorMessage(error)}`);
  }
}

type createCommentParams = {
  text: string;
  author: string;
  community: string | null;
  path: string;
  parent: string;
};

export async function createComment({
  text,
  author,
  community,
  path,
  parent,
}: createCommentParams) {
  try {
    connectToDB();
    const parentThread = await Thread.findById(parent);
    if (!parentThread) throw new Error("Thread not found!");

    const comment = new Thread({
      text: text,
      author: author,
      community: community,
      parentId: parent,
    });
    const childThread = await comment.save();

    parentThread.children.push(childThread._id);
    await parentThread.save();
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create a thread: ${getErrorMessage(error)}`);
  }
}

//TODO: hello typescript my old friend
export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    const skipNumber = (pageNumber - 1) * pageSize;
    const threadsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipNumber)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name username parentId image",
        },
      });

    const threadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const threads = await threadsQuery.exec();
    const hasNext = threadsCount > skipNumber + threads.length;

    return { threads, hasNext };
  } catch (error) {
    throw new Error(`Failed to fetch threads: ${getErrorMessage(error)}`);
  }
}

export async function fetchThreadById(id: string) {
  // TODO: community
  try {
    connectToDB();
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id username name image",
      })
      .populate({
        path: "children",
        model: Thread,
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id username name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id username name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error) {
    throw new Error(`Failed to fetch thread: ${getErrorMessage(error)}`);
  }
}

export async function fetchThreadsByUser(userId: string) {
  // TODO: community
  try {
    connectToDB();
    const userWithThreads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id username",
          },
        },
        {
          path: "author",
          model: User,
          select: "name image id username",
        },
      ],
    });

    return userWithThreads;
  } catch (error) {
    throw new Error(`Failed to fetch threads: ${getErrorMessage(error)}`);
  }
}
