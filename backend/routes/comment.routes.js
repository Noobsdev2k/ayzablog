import express from "express";
const router = express.Router();

import {
  createComment,
  getByBlog,
  updateComment,
} from "../controllers/comment.controller.js";

import auth from "../middleware/auth.js";

router.post("/", auth, createComment);
router.get("/getByBlog", getByBlog);
router.patch("/:id", auth, updateComment);
// router.delete("/delete/:id", auth);

export default router;
