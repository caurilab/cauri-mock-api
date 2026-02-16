# Mock API Server - Modulaire et Réutilisable

Serveur API mock avec **auto-chargement** des routes et données. Ajoutez un fichier, il est automatiquement disponible.

## Installation

```bash
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer le serveur
node server.js
```

Le serveur démarre sur `http://localhost:8080` (ou le port défini dans `.env`)

## Démarrage Rapide

### 1. Copier les templates

```bash
cp data/example.data.js data/users.data.js
cp routes/example.routes.js routes/users.routes.js
```

### 2. Personnaliser les données

```javascript
// data/users.data.js
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

module.exports = { users };
```

### 3. Personnaliser les routes

```javascript
// routes/users.routes.js
const express = require('express');
const router = express.Router();
const { users } = require('../data');  // ← Auto-chargé !

router.get('/users', (req, res) => {
  res.json({ success: true, data: users });
});

router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.json({
    success: !!user,
    data: user,
    error: user ? null : 'User not found'
  });
});

module.exports = router;
```

### 4. C'est tout !

```bash
node server.js

# Output:
✓ Data loaded: example.data.js
✓ Data loaded: users.data.js      ← Auto-chargé !
✓ Route loaded: example.routes.js
✓ Route loaded: users.routes.js   ← Auto-chargé !

# Tester
curl http://localhost:8080/api/users
curl http://localhost:8080/api/users/1
```

## Auto-chargement

**Routes** - Tous les `*.routes.js` dans `routes/` sont automatiquement chargés

**Données** - Tous les `.js` dans `data/` sont automatiquement chargés

**Import simplifié** - Un seul require pour tout :

```javascript
const { users, products, orders } = require('../data');
```

## Structure

```
├── server.js              # Point d'entrée
├── data/
│   ├── index.js           # Auto-loader
│   └── example.data.js    # Template
└── routes/
    ├── index.js           # Auto-loader
    ├── example.routes.js  # Template CRUD
    └── health.routes.js   # Health check
```

## Templates

### Routes ([example.routes.js](routes/example.routes.js))

- `GET /examples` - Liste avec filtres
- `GET /examples/:id` - Item unique
- `POST /examples` - Créer
- `PATCH /examples/:id` - Modifier
- `DELETE /examples/:id` - Supprimer

### Données ([example.data.js](data/example.data.js))

- `simpleData` - Structure basique
- `users` - Utilisateurs
- `products` - Produits

## Format de Réponse

```javascript
// Succès
{ "success": true, "data": {...} }

// Erreur
{ "success": false, "error": "Message" }
```

## Utilisation dans un Projet

```javascript
const express = require('express');
const mockRoutes = require('./cauri-mock-api/routes');

const app = express();
app.use(express.json());
app.use('/api', mockRoutes);
app.listen(3000);
```

