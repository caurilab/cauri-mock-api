const express = require("express");
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Mock API Server running" });
});

module.exports = router;
