import { GeneralUserInfo } from "@/components/forms/account-form";
import mongoose from "mongoose";
import { IThread } from "./thread.model";
import { ICommunity } from "./community.model";

export interface IUser extends GeneralUserInfo, mongoose.Document {
  id: string;
  threads: IThread[];
  communities: ICommunity[];
  onboarded: boolean;
}

// TODO: make TS work!

const userModel = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model("User", userModel);

export default User;
