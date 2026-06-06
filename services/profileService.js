import prisma from "../config/prisma.js";
import { analyzeGithubProfile } from "./githubService.js";


export const analyzeAndStoreProfile = async (username) => {
  const analysis = await analyzeGithubProfile(username);

  const profile = await prisma.githubProfile.upsert({
    where: {
      username: analysis.username,
    },

    update: {
      name: analysis.name,
      bio: analysis.bio,

      avatarUrl: analysis.avatarUrl,
      profileUrl: analysis.profileUrl,

      publicRepos: analysis.publicRepos,
      publicGists: analysis.publicGists,

      followers: analysis.followers,
      following: analysis.following,

      totalStars: analysis.totalStars,
      totalForks: analysis.totalForks,

      accountAgeDays: analysis.accountAgeDays,
      followerRepoRatio: analysis.followerRepoRatio,

      githubCreatedAt: new Date(
        analysis.githubCreatedAt
      ),
    },

    create: {
      username: analysis.username,
      githubId: analysis.githubId,

      name: analysis.name,
      bio: analysis.bio,

      avatarUrl: analysis.avatarUrl,
      profileUrl: analysis.profileUrl,

      publicRepos: analysis.publicRepos,
      publicGists: analysis.publicGists,

      followers: analysis.followers,
      following: analysis.following,

      totalStars: analysis.totalStars,
      totalForks: analysis.totalForks,

      accountAgeDays: analysis.accountAgeDays,
      followerRepoRatio: analysis.followerRepoRatio,

      githubCreatedAt: new Date(
        analysis.githubCreatedAt
      ),
    },
  });

  return profile;
};

export const getAllProfiles = async () => {
  console.log("Fetching all profiles from database...");
  return prisma.githubProfile.findMany({
    orderBy: {
      analyzedAt: "desc",
    },
  });
};

export const getProfileByUsername = async (
  username
) => {
  return prisma.githubProfile.findUnique({
    where: {
      username,
    },
  });
};