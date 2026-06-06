import {
  analyzeAndStoreProfile,
  getAllProfiles,
} from "../services/profileService.js";


await analyzeAndStoreProfile("OmkarMisal14");

const profiles = await getAllProfiles();

console.log(profiles);