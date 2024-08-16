import express from "express";

import {
  deleteFolder,
  getFolder,
  postFolder,
  getSingleFolder,
} from "../controllers/folder.js";

const router = express.Router();

// Get all user folders
router.get("/", getFolder);

// Get specified folder
router.get("/:id", getSingleFolder);

// Insert new Folder
router.post("/", postFolder);

// Delete single folder
router.delete("/:id", deleteFolder);

export default router;
