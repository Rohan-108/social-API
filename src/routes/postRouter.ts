import express from "express";
import {
  getAllPost,
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  likePost,
} from "../controller/postController";
import protect from "../middleware/authMiddleware";
const router = express.Router();
router.route("/").get(getAllPost);
//router.route("/search").get(getPostBySearch);
router.route("/").post(protect, createPost);
router.route("/:id").get(getOnePost);
router.route("/:id").delete(protect, deletePost);
router.route("/:id").put(protect, updatePost);
router.route("/like/:id").put(likePost);
export default router;
