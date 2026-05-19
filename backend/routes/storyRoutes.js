import express from "express";
import {getStoryAll, getStorySingle, getAllCategories} from "../controllers/storyController.js"

const router = express.Router();

// router.post("/", createStory);
router.get("/", getStoryAll);
router.get("/categories", getAllCategories);
router.get("/:id", getStorySingle);
//router.put("/:id", updateStory);
// router.delete("/:id", deleteStory);

export default router;