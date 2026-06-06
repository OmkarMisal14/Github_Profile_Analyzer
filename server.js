import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import profileRoutes from "./routes/profileRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/profiles", profileRoutes);

app.get('/', (req, res) => {
    console.log("API is running");
  res.send("API is running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
