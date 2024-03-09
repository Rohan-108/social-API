import express from "express";
import {
  registerUser,
  loginUser,
  getPostByUser,
  getFollowers,
  getFollowings,
} from "../controller/userController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/posts").get(protect, getPostByUser);
router.route("/followers").get(protect, getFollowers);
router.route("/followings").get(protect, getFollowings);
export default router;
