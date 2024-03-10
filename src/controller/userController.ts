import { UserModel as User, getUserByEmail } from "../db/user/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { followModel } from "../db/follower/follow";
import { postModel } from "../db/post/post";

export const loginUser = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ message: "please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email }).select("password");
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    // checking password
    const isPasswordCorrect = await bcrypt.compare(pass, existingUser.password);
    // if not correct
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "password not correct" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// function to register user

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body;
  const email = data.email;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(404).json({ message: "User already exist" });

    //creating hashed password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    //creating new user
    const newUser = await User.create({ ...data, password: hashedPassword });
    const token = jwt.sign(
      { email: data.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get all post made by me

export const getPostByUser = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.user._id).populate({ path: "posts" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get all followers

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const data = await followModel.find({
      following: req.user._id,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// get all followings

export const getFollowings = async (req: Request, res: Response) => {
  try {
    const data = await followModel.find({
      followedBy: req.user._id,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// feed for the user

export const getFeed = async (req: Request, res: Response) => {
  try {
    const followedUsers = await followModel.find({ followedBy: req.user._id });
    const followedUserIds = followedUsers.map((follow) => follow.following);

    const posts = await postModel
      .find({
        postedBy: { $in: followedUserIds },
      })
      .select("content")
      .populate("postedBy")
      .select("username email pic")
      .sort({ createdAt: -1 });
    res.status(200).json({ result: posts });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update user profile

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (data.password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { data },
      { new: true }
    );
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
