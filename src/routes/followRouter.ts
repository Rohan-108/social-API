import express from "express";
import { follow, unfollow } from "../controller/followController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.route("/:id").post(protect, follow);
router.route("/unfollow/:id").post(protect, unfollow);
export default router;
