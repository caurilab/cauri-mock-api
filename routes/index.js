const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Automatically import all .routes.js files
const routesPath = __dirname;
const routeFiles = fs
  .readdirSync(routesPath)
  .filter((file) => file.endsWith(".routes.js"));

// Load and register each route module
routeFiles.forEach((file) => {
  const routeModule = require(path.join(routesPath, file));
  router.use("/", routeModule);
  console.log(`✓ Route loaded: ${file}`);
});

module.exports = router;
