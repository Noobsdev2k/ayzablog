import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  googleSignIn,
  getProfile,
} from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.get("/profile", auth, getProfile);

export default router;
