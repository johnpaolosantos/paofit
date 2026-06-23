import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

// Protected route example
app.get("/api/user", requireAuth(), (req, res) => {
    res.json({ user: req.auth.userId });
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server is up and running on port: ", PORT);
    if (process.env.NODE_ENV === "production") job.start();
});
