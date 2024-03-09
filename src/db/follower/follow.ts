import mongoose, { Types } from "mongoose";

export interface followType {
  content: string;
  likes: number;
  postedBy: Types.ObjectId;
}

const followSchema = new mongoose.Schema(
  {
    followedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    following: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const followModel = mongoose.model<followType>("Follow", followSchema);
