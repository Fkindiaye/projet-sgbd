// src/routes/fichierRoutes.js
const express = require('express');
const { validerEtTransferer } = require('../controllers/fichierController');
const router = express.Router();

// Route pour valider et transférer le fichier
router.post('/upload', (req, res) => {
    const fichierPath = req.body.fichierPath; // Assurez-vous que le chemin du fichier est passé dans le corps de la requête
    const empreinteAttendue = req.body.empreinte; // Empreinte SHA256 attendue
    validerEtTransferer(fichierPath, empreinteAttendue)
        .then(() => res.send('Fichier validé et traité avec succès.'))
        .catch((err) => res.status(500).send('Erreur lors du traitement du fichier.'));
});

module.exports = router;
