// src/index.js
const express = require('express');
const fichierRoutes = require('./routes/fichierRoutes');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/fichier', fichierRoutes);

// Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
