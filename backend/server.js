const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = 5000;

const dbConfig = {
    server: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || "DevOpsPortal",
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    connectionTimeout: 10000,
    requestTimeout: 10000
};

let pool;

async function connectToDatabase() {
    const maxRetries = 10;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            pool = await sql.connect(dbConfig);
            console.log("Connected to SQL Server");
            return;
        } catch (error) {
            console.error(
                `Database connection attempt ${attempt}/${maxRetries} failed`
            );

            if (attempt === maxRetries) {
                console.error("Could not connect to SQL Server");
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

app.get("/", (req, res) => {
    res.json({
        message: "DevOps Backend is running"
    });
});

app.get("/api/courses", async (req, res) => {
    try {
        if (!pool) {
            await connectToDatabase();
        }

        if (!pool) {
            return res.status(503).json({
                error: "Database unavailable"
            });
        }

        const result = await pool
            .request()
            .query(
                "SELECT id, name, level FROM courses ORDER BY id"
            );

        res.json(result.recordset);

    } catch (error) {
        console.error("Database error:", error);

        pool = null;

        res.status(500).json({
            error: "Failed to fetch courses"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);

    connectToDatabase();
});