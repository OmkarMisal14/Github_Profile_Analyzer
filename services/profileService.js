import pool from "../config/db.js";
import { analyzeGithubProfile } from "./githubService.js";

export const analyzeAndStoreProfile = async (username) => {
  const analysis = await analyzeGithubProfile(username);

  const githubCreatedAt = new Date(analysis.githubCreatedAt);

  // Check if the user already exists to prevent auto-increment gap issues
  const [existingRows] = await pool.query('SELECT id FROM GithubProfile WHERE username = ?', [analysis.username]);

  if (existingRows.length > 0) {
    const updateQuery = `
      UPDATE GithubProfile SET
        name = ?, bio = ?, avatarUrl = ?, profileUrl = ?,
        publicRepos = ?, publicGists = ?, followers = ?, following = ?,
        totalStars = ?, totalForks = ?, accountAgeDays = ?, followerRepoRatio = ?,
        githubCreatedAt = ?, updatedAt = NOW()
      WHERE username = ?
    `;

    const updateValues = [
      analysis.name || null,
      analysis.bio || null,
      analysis.avatarUrl,
      analysis.profileUrl,
      analysis.publicRepos,
      analysis.publicGists,
      analysis.followers,
      analysis.following,
      analysis.totalStars || 0,
      analysis.totalForks || 0,
      analysis.accountAgeDays,
      analysis.followerRepoRatio || null,
      githubCreatedAt,
      analysis.username
    ];

    await pool.query(updateQuery, updateValues);
  } else {
    const insertQuery = `
      INSERT INTO GithubProfile (
        username, githubId, name, bio, avatarUrl, profileUrl,
        publicRepos, publicGists, followers, following,
        totalStars, totalForks, accountAgeDays, followerRepoRatio,
        githubCreatedAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const insertValues = [
      analysis.username,
      analysis.githubId,
      analysis.name || null,
      analysis.bio || null,
      analysis.avatarUrl,
      analysis.profileUrl,
      analysis.publicRepos,
      analysis.publicGists,
      analysis.followers,
      analysis.following,
      analysis.totalStars || 0,
      analysis.totalForks || 0,
      analysis.accountAgeDays,
      analysis.followerRepoRatio || null,
      githubCreatedAt
    ];

    await pool.query(insertQuery, insertValues);
  }

  const [rows] = await pool.query('SELECT * FROM GithubProfile WHERE username = ?', [analysis.username]);
  return rows[0];
};

export const getAllProfiles = async () => {
  console.log("Fetching all profiles from database...");
  const [rows] = await pool.query('SELECT * FROM GithubProfile ORDER BY analyzedAt DESC');
  return rows;
};

export const getProfileByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM GithubProfile WHERE username = ?', [username]);
  return rows[0] || null;
};
