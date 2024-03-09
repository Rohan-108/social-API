import mongoose, { Types } from "mongoose";

export interface PostType {
  content: string;
  likes: number;
  postedBy: Types.ObjectId;
}

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    postedBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const postModel = mongoose.model<PostType>("Post", postSchema);

/// actions on post

export const getPosts = () => postModel.find();
export const getPostById = (id: string) => postModel.findById(id);

export const createPost = (values: Record<string, any>) =>
  new postModel(values).save().then((post) => post.toObject());

export const deletePost = (id: string) =>
  postModel.findOneAndDelete({ _id: id });

export const updatePost = (id: string, values: Record<string, any>) =>
  postModel.findByIdAndUpdate(id, values);
