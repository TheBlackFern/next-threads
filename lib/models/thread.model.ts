import mongoose, { Schema, Model } from "mongoose";

export interface IThread extends mongoose.Document {
  text: string;
  author: mongoose.Schema.Types.ObjectId;
  community: mongoose.Schema.Types.ObjectId;
  created: Date;
  parentId: string;
  children: mongoose.Schema.Types.ObjectId[];
}

// TODO: make TS work!

const threadModel: Schema = new mongoose.Schema({
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

const Thread: Model<IThread> =
  mongoose.models.Thread || mongoose.model("Thread", threadModel);

export default Thread;
