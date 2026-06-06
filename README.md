# GitHub Profile Analyzer API

A backend service built with Node.js, Express.js, and MySQL that analyzes a GitHub user's public profile using the GitHub REST API and stores useful insights.

## Features

* **Fetch & Analyze Profile**: Analyzes a GitHub user's profile and returns insights such as follower/repo ratio, total stars, total forks, account age, and more.
* **Store in MySQL**: The extracted values are stored in a MySQL database.
* **List Profiles**: Fetch a list of all previously analyzed profiles.
* **Get Specific Profile**: Fetch database insights for a specific username.

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios (for interacting with GitHub API)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd Github_Profile_Analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=github_profile_analyzer
DB_USER=root
DB_PASSWORD=your_password

GITHUB_TOKEN=your_personal_access_token
GITHUB_API_URL=https://api.github.com
```

> **Note:** `GITHUB_TOKEN` is optional but recommended to avoid GitHub API rate limits.

### 4. Create the Database

Login to MySQL and create the database:

```sql
CREATE DATABASE github_profile_analyzer;
```

### 5. Start the Application

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Endpoints

### 1. Analyze and Store GitHub Profile

* **Endpoint:** `POST /api/profiles/:username`
* **Description:** Fetches data from the GitHub API, calculates insights (such as total stars, total forks, follower ratio, and account age), stores the results in MySQL, and returns the saved record.
* **Response:** `201 Created`

### 2. Get All Analyzed Profiles

* **Endpoint:** `GET /api/profiles`
* **Description:** Retrieves all analyzed profiles stored in the database.
* **Response:** `200 OK`

### 3. Get Specific Analyzed Profile

* **Endpoint:** `GET /api/profiles/:username`
* **Description:** Retrieves analysis data for a specific GitHub username from the database.
* **Response:** `200 OK` or `404 Not Found`

## Project Structure

```text
Github_Profile_Analyzer/
├── controllers/
├── routes/
├── services/
├── config/
│   └── db.js
├── models/
├── .env
├── server.js
└── package.json
```
