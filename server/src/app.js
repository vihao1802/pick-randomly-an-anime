import express, { json } from "express";
import { rateLimit } from "express-rate-limit";
import * as dotenv from "dotenv";
import animes_routes from "./routes/animes.js";
import cors from "cors";
import connectToDB from "./database/connectDB.js";

dotenv.config();

const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  limit: 100, // 100 requests per 5 min
  message: "Limit has reached",
});

app.use(json());
app.use(limiter);
app.use(cors());

const PORT = process.env.SERVER_LOCAL_PORT || 5000;

app.get("/", async (req, res) => {
  res.json({
    status: 200,
    message: "Welcome to the server",
  });
});

app.use("/api/v1/animes", animes_routes);

try {
  app.listen(PORT, async () => {
    await connectToDB();
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log(err);
}
