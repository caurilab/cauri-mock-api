// mock-api-server.js
// Serveur mock simple pour tester l'extension CAURI Lab
// Usage: node mock-api-server.js

// Charger les variables d'environnement
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  Mock API Server - ${NODE_ENV.toUpperCase().padEnd(28)} ║
║                                                        ║
║  Server: http://localhost:${PORT}                       ║
║  API: http://localhost:${PORT}/api                      ║
╚════════════════════════════════════════════════════════╝
  `);
});
