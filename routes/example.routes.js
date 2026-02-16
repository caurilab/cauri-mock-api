/**
 * TEMPLATE DE ROUTES - CRUD Simple
 *
 * Copiez ce fichier et adaptez-le à vos besoins :
 * cp routes/example.routes.js routes/myroutes.routes.js
 *
 * Ce fichier utilise les données de example.data.js
 */

const express = require("express");
const router = express.Router();

// Import automatique des données
const { simpleData } = require("../data");

// ============================================
// GET - Liste (avec filtres optionnels)
// ============================================
router.get("/examples", (req, res) => {
  try {
    const { status, limit } = req.query;
    let results = [...simpleData];

    // Filtrer par statut si fourni
    if (status) {
      results = results.filter((item) => item.status === status);
    }

    // Limiter les résultats si demandé
    if (limit) {
      results = results.slice(0, parseInt(limit));
    }

    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// GET - Item unique par ID
// ============================================
router.get("/examples/:id", (req, res) => {
  try {
    const item = simpleData.find((item) => item.id == req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// POST - Créer un nouvel item
// ============================================
router.post("/examples", (req, res) => {
  try {
    const { name, status } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Le nom est requis",
      });
    }

    // Créer le nouvel item
    const newItem = {
      id: Math.max(...simpleData.map((i) => i.id), 0) + 1,
      name,
      status: status || "active",
    };

    simpleData.push(newItem);

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// PATCH - Modifier partiellement
// ============================================
router.patch("/examples/:id", (req, res) => {
  try {
    const itemIndex = simpleData.findIndex((item) => item.id == req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    // Appliquer les modifications
    simpleData[itemIndex] = {
      ...simpleData[itemIndex],
      ...req.body,
    };

    res.json({ success: true, data: simpleData[itemIndex] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// DELETE - Supprimer
// ============================================
router.delete("/examples/:id", (req, res) => {
  try {
    const itemIndex = simpleData.findIndex((item) => item.id == req.params.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Item non trouvé",
      });
    }

    const deletedItem = simpleData[itemIndex];
    simpleData.splice(itemIndex, 1);

    res.json({ success: true, data: deletedItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
