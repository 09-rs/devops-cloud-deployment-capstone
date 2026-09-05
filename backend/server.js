const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

const dbConfig = {
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "DevOpsPortal",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 5
};

const pool = new Pool(dbConfig);

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});

async function connectToDatabase() {
    const maxRetries = 10;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const client = await pool.connect();
            client.release();

            console.log("Connected to PostgreSQL");
            return true;

        } catch (error) {
            console.error(
                `Database connection attempt ${attempt}/${maxRetries} failed`
            );

            if (attempt === maxRetries) {
                console.error("Could not connect to PostgreSQL");
                return false;
            }

            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    return false;
}

app.get("/", (req, res) => {
    res.json({
        message: "DevOps Backend is running"
    });
});

app.get("/api/courses", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, level FROM courses ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            error: "Failed to fetch courses"
        });
    }
});

app.listen(PORT, async () => {
    console.log(`Backend running on port ${PORT}`);

    await connectToDatabase();
});