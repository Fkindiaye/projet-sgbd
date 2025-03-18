import express from 'express';
const router = express.Router();

// Exemple de route pour les électeurs
router.get('/', (req, res) => {
  res.send('Liste des électeurs');
});

export default router; // Assure-toi que cette ligne est bien présente
