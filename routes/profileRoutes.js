import express from "express";
import { analyzeProfile, listProfiles, getProfile } from "../controller/profileController.js";

const router = express.Router();

router.post("/:username", analyzeProfile);// Analyze a GitHub profile and store insights
router.get("/", listProfiles);// Get all analyzed profiles
router.get("/:username", getProfile);// Get a single analyzed profile by username

export default router;
