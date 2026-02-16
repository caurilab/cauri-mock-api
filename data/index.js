/**
 * AUTO-LOADER DE DONNÉES
 *
 * Ce fichier charge automatiquement tous les fichiers .js du dossier data/
 * (sauf index.js) et les rend disponibles via un import simple.
 *
 * Fichiers supportés :
 * - *.data.js (recommandé pour nouveaux projets)
 * - *.js (pour compatibilité avec fichiers existants)
 *
 * Usage dans les routes :
 * const { users, products, mockData } = require('../data');
 */

const fs = require("fs");
const path = require("path");

const dataPath = __dirname;
const dataFiles = fs
  .readdirSync(dataPath)
  .filter((file) => {
    // Charger tous les fichiers .js sauf index.js et les fichiers cachés
    return (
      file.endsWith(".js") &&
      file !== "index.js" &&
      !file.startsWith(".")
    );
  });

const data = {};

// Charger chaque fichier de données
dataFiles.forEach((file) => {
  try {
    const dataModule = require(path.join(dataPath, file));

    // Fusionner les exports du module dans l'objet data
    Object.assign(data, dataModule);

    console.log(`✓ Data loaded: ${file}`);
  } catch (error) {
    console.error(`✗ Error loading ${file}:`, error.message);
  }
});

// Export de toutes les données
module.exports = data;
