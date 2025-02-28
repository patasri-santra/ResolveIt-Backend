import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/issues.js";
//import cors from "cors";

dotenv.config(); // Load .env variables before using them

const app = express();

// Middleware
app.use(cors({origin: "*", // Allow all origins (for testing)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],}));
//app.use(cors());
app.use(express.json());
app.use('/api/issues',router)

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
