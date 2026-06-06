import axios from "axios";
import { calculateInsights } from "./calculateInsights.js";
import "dotenv/config";
const github_api_url = process.env.GITHUB_API_URL;
const githubApi = axios.create({
  baseURL: github_api_url,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

// Fetch GitHub profile data by username
export const fetchGithubProfile = async (username) => {
  try {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("GitHub user not found");
    }

    throw new Error("Failed to fetch GitHub profile");
  }
};

// Fetch GitHub repositories by username
export const fetchGithubRepositories = async (username) => {
  try {
    const { data } = await githubApi.get(`/users/${username}/repos`);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch repositories");
  }
};

// Analyze a GitHub profile and calculate insights
export const analyzeGithubProfile = async (username) => {
  const profile = await fetchGithubProfile(username);

  const repos = await fetchGithubRepositories(username);

  const insights = calculateInsights(profile, repos);

  return {
    username: profile.login,
    githubId: profile.id,

    name: profile.name,
    bio: profile.bio,

    avatarUrl: profile.avatar_url,
    profileUrl: profile.html_url,

    publicRepos: profile.public_repos,
    publicGists: profile.public_gists,

    followers: profile.followers,
    following: profile.following,

    githubCreatedAt: profile.created_at,

    ...insights,
  };
};