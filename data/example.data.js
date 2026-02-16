/**
 * TEMPLATE DE DONNÉES - Exemples Simples
 *
 * Copiez ce fichier et adaptez-le à vos besoins :
 * cp data/example.data.js data/mydata.data.js
 */

// Exemple 1 : Données simples
const simpleData = [
  { id: 1, name: "Item 1", status: "active" },
  { id: 2, name: "Item 2", status: "active" },
  { id: 3, name: "Item 3", status: "inactive" },
];

// Exemple 2 : Utilisateurs
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    isActive: true,
  },
];

// Exemple 3 : Produits
const products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299.99,
    stock: 45,
    category: "electronics",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 29.99,
    stock: 150,
    category: "accessories",
  },
];

// Exporter vos données
module.exports = {
  simpleData,
  users,
  products,
};
