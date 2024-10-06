import express from "express";
import { addPost, deletePost, getPost, updatePost } from "../controllers/postsController.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.get("/", getPost)
router.post("/", auth, addPost)
router.delete("/:id", auth, deletePost)
router.put("/:id", auth, updatePost)

export default router;