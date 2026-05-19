import express from "express";
import {getStoryAll, getStorySingle, getAllCategories} from "../controllers/storyController.js"

const router = express.Router();

router.get("/", getStoryAll);
router.get("/categories", getAllCategories);
router.get("/:id", getStorySingle);

// Only READ operation allowed, for security reasons.
// router.post("/", createStory);
// router.put("/:id", updateStory);
// router.delete("/:id", deleteStory);

export default router;