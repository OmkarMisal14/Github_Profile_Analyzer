import { analyzeGithubProfile } from "../services/githubService.js";
import "dotenv/config";

const result = await analyzeGithubProfile("torvalds");

console.log(result);