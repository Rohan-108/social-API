import express from "express";
import { follow, unfollow } from "../controller/followController";
import protect from "../middleware/authMiddleware";
const router = express.Router();

router.route("/:id").get(protect, follow);
router.route("/unfollow/:id").get(protect, unfollow);
export default router;
