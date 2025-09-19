// routes/users.js
const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Alice", role: "User" },
  { id: 2, name: "Bob", role: "Admin" }
];

// GET list users
router.get("/list", (req, res) => {
  res.json(users);
});

// POST add user
router.post("/add", (req, res) => {
  const { name, role } = req.body;

  // Verifică dacă numele și rolul există
  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }

  // Creează și adaugă userul
  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;