# Github Profile Analyzer API

A backend service built with Node.js, Express.js, and MySQL (via Prisma) that analyzes a GitHub user's public profile using the GitHub REST API and stores useful insights.

## Features
- **Fetch & Analyze Profile**: Analyzes a GitHub user's profile and returns insights such as follower/repo ratio, total stars, total forks, account age, and more.
- **Store in MySQL**: The extracted values are stored natively in a MySQL database.
- **List Profiles**: Fetch a list of all previously analyzed profiles.
- **Get Specific Profile**: Fetch database insights for a specific username.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Prisma ORM
- Axios (for interacting with GitHub API)

## Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-link>
cd Github_Profile_Analyzer
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the root of your project and configure standard variables:
```env
PORT=5000
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
GITHUB_TOKEN="your_personal_access_token" # (Optional but highly recommended to avoid rate-limiting)
```

4. **Initialize Prisma & Run Migrations**
```bash
npx prisma generate
npx prisma db push
# or npx prisma migrate dev
```

5. **Start the Application**
```bash
npm start
# or for development:
npm run dev
```

## API Endpoints

### 1. Analyze and Store GitHub Profile
- **Endpoint:** `POST /api/profiles/:username`
- **Description:** Fetches data from the GitHub API, calculates insights (like total stars, total forks, follower ratio), stores it in MySQL, and returns the stored data.
- **Response:** `201 Created`

### 2. Get All Analyzed Profiles
- **Endpoint:** `GET /api/profiles`
- **Description:** Retrieves a list of all analyzed profiles stored in the database.
- **Response:** `200 OK`

### 3. Get Specific Analyzed Profile
- **Endpoint:** `GET /api/profiles/:username`
- **Description:** Retrieve a single profile analysis result from the database by username.
- **Response:** `200 OK` or `404 Not Found`
