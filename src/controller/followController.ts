import mongoose from "mongoose";
import { Request, Response } from "express";
import { followModel as Follow } from "../db/follower/follow";
import { getUserById } from "../db/user/users";

export const follow = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const userToBeFollowed = await getUserById(id);
    if (!userToBeFollowed)
      return res.status(404).json({ message: "user doesn't exist" });
    const already = await Follow.findOne({
      followedBy: req.user._id,
      following: userToBeFollowed._id,
    });
    if (already) return res.status(200).json({ message: "already following" });
    const f = await Follow.create({
      followedBy: req.user._id,
      following: userToBeFollowed._id,
    });
    await f.save();
    return res
      .status(201)
      .json({ message: `you are following ${userToBeFollowed.username}` });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const unfollow = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id not correct" });
  try {
    const userToBeFollowed = await getUserById(id);
    if (!userToBeFollowed)
      return res.status(404).json({ message: "user doesn't exist" });
    const already = await Follow.findOne({
      followedBy: req.user._id,
      following: userToBeFollowed._id,
    });
    if (!already)
      return res.status(200).json({ message: "Not following that user" });
    const f = await Follow.findOneAndDelete({
      followedBy: req.user._id,
      following: userToBeFollowed._id,
    });
    return res
      .status(201)
      .json({ message: `you have unfollwed ${userToBeFollowed.username}` });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
