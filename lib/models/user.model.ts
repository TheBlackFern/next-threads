import { GeneralUserInfo } from "@/components/forms/Account";
import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends GeneralUserInfo, mongoose.Document {
  id: string;
  threads: mongoose.Schema.Types.ObjectId[];
  communities: mongoose.Schema.Types.ObjectId[];
  onboarded: boolean;
}

// TODO: make TS work!

const userModel: Schema = new mongoose.Schema({
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

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userModel);

export default User;
