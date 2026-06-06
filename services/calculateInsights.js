export const calculateInsights = (profile, repos) => {
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const accountAgeDays = Math.floor(
    (Date.now() - new Date(profile.created_at).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const followerRepoRatio =
    profile.public_repos > 0
      ? Number(
          (profile.followers / profile.public_repos).toFixed(2)
        )
      : 0;

  return {
    totalStars,
    totalForks,
    accountAgeDays,
    followerRepoRatio,
  };
};