import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.JWT_SECRET || "lll-brother-secret-key-2026";

// Admin Credentials (Change these in your .env file)
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "3brother!2026";

app.use(express.json());
app.use(cookieParser());

// Simple JSON Database (Local file storage)
const DB_PATH = path.join(process.cwd(), "db.json");
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ inquiries: [], analytics: [] }, null, 2));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const saveDB = (data: any) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Auth Middleware
const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// --- API Routes ---

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "24h" });
    res.cookie("admin_token", token, { 
      httpOnly: true, 
      secure: true, 
      sameSite: "none" // Required for AI Studio preview iframe
    });
    return res.json({ success: true });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

// Check Auth Status
app.get("/api/auth-status", (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.json({ loggedIn: false });
  try {
    jwt.verify(token, SECRET_KEY);
    res.json({ loggedIn: true, user: ADMIN_USER });
  } catch (e) {
    res.json({ loggedIn: false });
  }
});

// Log Analytics
app.post("/api/analytics", (req, res) => {
  const db = getDB();
  db.analytics.push({ ...req.body, timestamp: new Date().toISOString() });
  saveDB(db);
  res.json({ success: true });
});

// Submit Inquiry
app.post("/api/inquiries", (req, res) => {
  const db = getDB();
  db.inquiries.push({ ...req.body, id: Date.now().toString(), timestamp: new Date().toISOString() });
  saveDB(db);
  res.json({ success: true });
});

// Get Stats (Protected)
app.get("/api/stats", verifyToken, (req, res) => {
  const db = getDB();
  res.json({
    visitors: db.analytics.length,
    inquiries: db.inquiries.length,
    inquiryList: db.inquiries,
    analyticsList: db.analytics
  });
});

// --- Vite Integration ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
