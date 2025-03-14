// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analyzeRouter = require("./routes/analyze");
const grammarCheck = require("./routes/grammarChecker");
const spellChecker = require("./routes/spellChecker");

const app = express();
const port = 8000;

// Updated CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Main API is working" });
});

// Routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/grammarcheck", grammarCheck);
app.use("/api/spellcheck", spellChecker);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} Not Found` });
});

app.listen(port, () => {
  console.log(`AI Writing app listening at http://localhost:${port}`);
});
