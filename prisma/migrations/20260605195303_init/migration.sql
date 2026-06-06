-- CreateTable
CREATE TABLE `GithubProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `githubId` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `company` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `blog` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(500) NOT NULL,
    `profileUrl` VARCHAR(500) NOT NULL,
    `publicRepos` INTEGER NOT NULL,
    `publicGists` INTEGER NOT NULL,
    `followers` INTEGER NOT NULL,
    `following` INTEGER NOT NULL,
    `totalStars` INTEGER NOT NULL DEFAULT 0,
    `totalForks` INTEGER NOT NULL DEFAULT 0,
    `accountAgeDays` INTEGER NOT NULL,
    `followerRepoRatio` DOUBLE NULL,
    `githubCreatedAt` DATETIME(3) NOT NULL,
    `analyzedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GithubProfile_username_key`(`username`),
    UNIQUE INDEX `GithubProfile_githubId_key`(`githubId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
