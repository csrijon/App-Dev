import express from "express";
import pool from "./config/db.js";
import main from "./routes/main.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:3000", "http://localhost:8081"], credentials: true }));
app.use(express.static("uploads"));

// Mount all application routes
app.use(main);

// Health check route (uses Prisma-managed table name)
app.get("/", async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Login&signupsystem" LIMIT 1');
        res.send({ status: "ok", message: "database connection established", count: result.rowCount });
    } catch (err) {
        console.log("DB health check error:", err.message);
        res.status(500).send({ status: "error", message: "database connection failed", error: err.message });
    }
});

// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message || "Unknown error" });
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
