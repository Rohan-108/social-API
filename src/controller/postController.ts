import { postModel as Post, getPostById } from "../db/post/post";
import mongoose from "mongoose";
import { Request, Response } from "express";
//to get all post made by all users
export const getAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
// to create new post
export const createPost = async (req: Request, res: Response) => {
  const post = req.body;
  const newPost = new Post({ ...post, postedBy: req.user._id });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: "something went wrong" });
  }
};
// to get the one post by id
export const getOnePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("postedBy")
      .select("username email pic");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// to delete the post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const post = await getPostById(id);
    //post not made by this user
    if (post.postedBy !== req.user._id) {
      return res.status(401).json("Unautjorized");
    }
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "item deleted" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
//update the post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = req.body;
  //console.log(Post);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const post = await getPostById(id);
    //post not made by this user
    if (post.postedBy !== req.user._id) {
      return res.status(401).json("Unautjorized");
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { post },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// like the post
export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  //console.log(Post);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $inc: {
          likes: 1,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// remove like   (to dooo)
// export const likePost = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   //console.log(Post);
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).json({ message: "id not correct" });
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       {
//         $inc: {
//           likes: 1,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
