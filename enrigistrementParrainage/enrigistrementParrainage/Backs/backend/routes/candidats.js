// routes/candidats.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assure-toi d'avoir une connexion MariaDB

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM candidats');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidats', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
