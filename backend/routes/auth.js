import express from "express";

import { postLogin, postSignUp, postLogout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", postLogin);
router.post("/signup", postSignUp);
router.post("/logout", postLogout);

export default router;
