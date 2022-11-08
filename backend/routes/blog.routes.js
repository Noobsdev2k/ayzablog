import express from "express";
const router = express.Router();
import upload from "../helper/multer.js";
import auth from "../middleware/auth.js";

import {
  createBlog,
  deleteBlog,
  getRelatedBlogs,
  getBlog,
  getBlogs,
  getBlogsBySearch,
  getBlogsByTag,
  getBlogsByUser,
  likeBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

router.get("/search", getBlogsBySearch);
router.get("/tag/:tag", getBlogsByTag);
router.post("/relatedblogs", getRelatedBlogs);
router.get("/", getBlogs);
router.get("/:id", getBlog);

router.post(
  "/",
  upload.fields([{ name: "imageFile", maxCount: 1 }]),
  auth,
  createBlog
);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id", auth, updateBlog);
router.get("/userblogs/:id", auth, getBlogsByUser);
router.patch("/like/:id", auth, likeBlog);

export default router;
