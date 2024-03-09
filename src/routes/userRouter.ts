import express from "express";
import {
  registerUser,
  loginUser,
  getPostByUser,
} from "../controller/userController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/posts").get(protect, getPostByUser);
export default router;
