import mongoose from "mongoose";
import { IUser } from "./user.model";
import { IThread } from "./thread.model";

export interface ICommunity extends mongoose.Document {
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  createdBy: IUser;
  threads: IThread[];
  members: IUser[];
}

const communitySchema = new mongoose.Schema<ICommunity>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Community: mongoose.Model<ICommunity> =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
