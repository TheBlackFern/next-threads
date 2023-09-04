import mongoose from "mongoose";
import { IUser } from "./user.model";
import { ICommunity } from "./community.model";

export interface IThread extends mongoose.Document {
  text: string;
  author: IUser;
  community: ICommunity;
  created: Date;
  parentId: string;
  children: IThread[];
}

// TODO: make TS work!

const threadModel = new mongoose.Schema<IThread>({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread: mongoose.Model<IThread> =
  mongoose.models.Thread || mongoose.model("Thread", threadModel);

export default Thread;
