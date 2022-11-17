import express from "express";
const router = express.Router();

import { createComment, getByBlog } from "../controllers/comment.controller.js";

import auth from "../middleware/auth.js";

router.post("/", auth, createComment);
router.get("/getByBlog", getByBlog);
// router.patch("/update/:id", auth);
// router.delete("/delete/:id", auth);

export default router;
