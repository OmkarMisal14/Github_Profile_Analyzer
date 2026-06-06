import { analyzeAndStoreProfile, getAllProfiles, getProfileByUsername } from "../services/profileService.js";

// @desc    Analyze a GitHub profile and store insights
// @route   POST: /api/profiles/:username
// @access  Public
export const analyzeProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    if (!username) {
      const error = new Error("Username parameter is required");
      error.statusCode = 400;
      throw error;
    }

    const profile = await analyzeAndStoreProfile(username);

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      error.statusCode = 404;
      error.message = "GitHub user not found";
    }
    next(error);
  }
};

// @desc    Get all analyzed profiles
// @route   GET: /api/profiles
// @access  Public
export const listProfiles = async (req, res, next) => {
  try {
    const profiles = await getAllProfiles();
    
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single analyzed profile by username
// @route   GET: /api/profiles/:username
// @access  Public
export const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await getProfileByUsername(username);

    if (!profile) {
      const error = new Error(`Profile with username ${username} not found in database`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
